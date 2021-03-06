const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

const driver = require('../../utils/neo4j_driver_v1.js')

dotenv.config()


const register_last_login = (user_id) => {
  const field_name = 'user'
  let session = driver.session()
  session
  .run(`
    MATCH (${field_name}:User)
    WHERE id(${field_name}) = toInteger($user_id)

    SET ${field_name}.last_login = date()

    // Return user if found
    RETURN ${field_name}
    `, { user_id })
  .then(() => { console.log(`[Auth] Successfully registered last login for user ${user_id}`) })
  .catch((error) => { console.log(`[Auth] Error setting last login: ${error}`) })
  .finally( () => { session.close() })

}

const find_user_in_db = (identifier) => {

  return new Promise ( (resolve, reject) => {

    const session = driver.session()
    session
    .run(`
      MATCH (user:User)

      // Allow user to identify using either userrname or email address
      WHERE user.username=$identifier
        OR user.email_address=$identifier
        OR id(user) = toInteger($identifier)

      // Return user if found
      RETURN user
      `, {
        identifier: identifier,
      })
    .then(result => {

      if(result.records.length < 1) return reject({code: 400, message: `User ${identifier} not found`})
      if(result.records.length > 1) return reject({code: 500, message: `Multiple users found`})

      const user = result.records[0].get('user')

      if(user.properties.locked) return reject({code: 500, message: `User account ${user.identity} is locked`})

      resolve(user)

      console.log(`[Neo4J] User ${user.identity} found in the DB`)

    })
    .catch(error => { reject({code: 500, message:error}) })
    .finally( () => session.close())

  })
}

const check_password = (password_plain, user) => {
  return new Promise ( (resolve, reject) => {

    // Retrieve hashed password from user properties
    const password_hashed = user.properties.password_hashed

    // check if the user has a password
    if(!password_hashed) return reject({code: 500, message: `User ${user.identity} does not have a password`})

    bcrypt.compare(password_plain, password_hashed, (error, password_correct) => {

      // Handle check errors
      if(error) return reject({code: 500, message: error})

      // Handle incoree
      if(!password_correct) return reject({code: 403, message: `Incorrect password`})

      resolve(user)

      console.log(`[Auth] Password correct for user ${user.identity}`)

    })

  })
}

const generate_token = (user) => {
  return new Promise( (resolve, reject) => {

    const JWT_SECRET = process.env.JWT_SECRET

    // Check if the secret is set
    if(!JWT_SECRET) return reject({code: 500, message: `Token secret not set`})

    const token_content = { user_id: user.identity.low }

    jwt.sign(token_content, JWT_SECRET, (error, token) => {

      // handle signing errors
      if(error) return reject({code: 500, message: error})

      // Resolve with token
      resolve(token)

      console.log(`[Auth] Token generated for user ${user.identity}`)

    })
  })
}

let verify_token = (token) => {
  return new Promise ( (resolve, reject) => {

    const JWT_SECRET = process.env.JWT_SECRET

    // Check if the secret is set
    if(!JWT_SECRET) return reject({code: 500, message: `Token secret not set`})

    jwt.verify(token, JWT_SECRET, (error, decoded_token) => {

      if(error) return reject({code: 403, message: `Invalid JWT`})

      resolve(decoded_token)

      console.log(`[Auth] Token decoded successfully`)

    })
  })
}

const retrieve_token_from_body_or_query = (req) => {
  return new Promise ( (resolve, reject) => {

    const token = req.body.token
      || req.body.jwt
      || req.query.jwt
      || req.query.token

    if(!token) return reject({code: 400, message: `Missing token`})

    resolve(token)

    console.log(`[Auth] Token retrieved from body or query`)

  })
}

let retrieve_token_from_headers = (req) => {
  return new Promise ( (resolve, reject) => {

    // Check if authorization header set
    if(!req.headers.authorization) return reject({code: 400, message: `Authorization header not set`})
    // parse the headers to get the token
    const token = req.headers.authorization.split(" ")[1];
    if(!token) return reject({code: 400, message: `Token not found in authorization header`})

    resolve(token)

    console.log(`[Auth] Token retrieved from headers`)

  })
}



exports.login = (req, res) => {

  // Input sanitation
  const identifier = req.body.username
    || req.body.email_address
    || req.body.email
    || req.body.identifier

  const password = req.body.password

  if(!identifier) return res.status(400).send(`Missing username or e-mail address`)
  if(!password) return res.status(400).send(`Missing password`)

  console.log(`[Auth] Login attempt from user identified as ${identifier}`)

  find_user_in_db(identifier)
  .then( user => { return check_password(password, user) })
  .then( user => {
    // Save the last login time of the user
    register_last_login(user.identity.low)

    return generate_token(user)
  })
  .then( token => { res.send({jwt: token}) })
  .catch(error => {
    console.log(error.message || error)
    res.status(error.code || 500).send(error.message || error)
  })
}

exports.whoami = (req, res) => {
  // Retrieves user information based on JWT present in auth header

  retrieve_token_from_headers(req)
  .then( token => {return verify_token(token)})
  .then( decoded_token => {

    const user_id = decoded_token.user_id
    if(!user_id) throw {code: 400, message: `No user ID in token`}

    return find_user_in_db(user_id)

  })
  .then( user => {
    console.log(`[Auth] user ${user.identity} retrieved using token`)
    res.send(user)
  })
  .catch(error => {
    console.log(`[Auth] ${error.message || error}`)
    res.status(error.code || 500).send(error.message || error)
  })
}

exports.decode_token = (req, res) => {

  retrieve_token_from_body_or_query(req)
  .then( token => {return verify_token(token)})
  .then(decoded_token => { res.send(decoded_token) })
  .catch(error => {
    console.log(error.message || error)
    res.status(error.code || 500).send(error.message || error)
  })

}

exports.get_user_from_jwt = (req, res) => {

  retrieve_token_from_body_or_query(req)
  .then( token => {return verify_token(token)})
  .then( decoded_token => {

    const user_id = decoded_token.user_id
    if(!user_id) throw {code: 400, message: `No user ID in token`}

    return find_user_in_db(user_id)

  })
  .then( user => {
    console.log(`[Auth] user ${user.identity} retrieved using token`)
    res.send(user)
  })
  .catch(error => {
    console.log(`[Auth] ${error.message || error}`)
    res.status(error.code || 500).send(error.message || error)
  })
}
