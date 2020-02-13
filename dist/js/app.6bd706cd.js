(function(t){function n(n){for(var o,r,s=n[0],u=n[1],l=n[2],p=0,g=[];p<s.length;p++)r=s[p],Object.prototype.hasOwnProperty.call(a,r)&&a[r]&&g.push(a[r][0]),a[r]=0;for(o in u)Object.prototype.hasOwnProperty.call(u,o)&&(t[o]=u[o]);c&&c(n);while(g.length)g.shift()();return i.push.apply(i,l||[]),e()}function e(){for(var t,n=0;n<i.length;n++){for(var e=i[n],o=!0,s=1;s<e.length;s++){var u=e[s];0!==a[u]&&(o=!1)}o&&(i.splice(n--,1),t=r(r.s=e[0]))}return t}var o={},a={app:0},i=[];function r(n){if(o[n])return o[n].exports;var e=o[n]={i:n,l:!1,exports:{}};return t[n].call(e.exports,e,e.exports,r),e.l=!0,e.exports}r.m=t,r.c=o,r.d=function(t,n,e){r.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:e})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,n){if(1&n&&(t=r(t)),8&n)return t;if(4&n&&"object"===typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(r.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var o in t)r.d(e,o,function(n){return t[n]}.bind(null,o));return e},r.n=function(t){var n=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(n,"a",n),n},r.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},r.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=n,s=s.slice();for(var l=0;l<s.length;l++)n(s[l]);var c=u;i.push([0,"chunk-vendors"]),e()})({0:function(t,n,e){t.exports=e("56d7")},2128:function(t,n,e){},"2c9e":function(t,n,e){"use strict";var o=e("adb5"),a=e.n(o);a.a},"2e26":function(t,n,e){"use strict";var o=e("2128"),a=e.n(o);a.a},"56d7":function(t,n,e){"use strict";e.r(n);e("e260"),e("e6cf"),e("cca6"),e("a79d");var o=e("2b0e"),a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{attrs:{id:"app"}},[e("AppTemplate",{attrs:{noLoginControls:"",applicationName:"Authentication manager"}})],1)},i=[],r=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"application_wrapper"},[e("header",[t.navigation.length>0?e("span",{staticClass:"mdi navigation_control button",class:t.navigation_control_icon,on:{click:function(n){return t.toggle_navigation()}}}):t._e(),e("img",{staticClass:"rotating_logo",attrs:{src:"https://cdn.maximemoreillon.com/logo/thick/logo.svg",alt:""}}),e("span",{staticClass:"application_name"},[t._v(t._s(t.applicationName))]),t.noLoginControls?t._e():e("span",{staticClass:"mdi mdi-logout aligned_right button",on:{click:function(n){return t.logout()}}})]),e("div",{staticClass:"columns_wrapper"},[t.navigation.length>0?e("nav",{class:{open:t.navigation_open}},t._l(t.navigation,(function(n,o){return e("router-link",{key:o,attrs:{to:n.route}},[e("span",{staticClass:"mdi",class:"mdi-"+n.icon,on:{click:function(n){return t.close_navigation()}}},[t._v(" "+t._s(n.label)+" ")])])})),1):t._e(),e("div",{staticClass:"nav_background",class:{visible:t.navigation_open},on:{click:function(n){return t.close_navigation()}}}),e("main",[e("router-view",{staticClass:"router_view"}),e("footer",[e("img",{staticClass:"rotating_logo",attrs:{src:"https://cdn.maximemoreillon.com/logo/thick/logo.svg",alt:""}}),e("div",{staticClass:"application_info"},[e("div",{staticClass:"application_name"},[t._v(t._s(t.applicationName))]),e("div",{staticClass:"author_name"},[t._v("Maxime MOREILLON")])])])],1)])])},s=[],u={name:"AppTemplate",props:{applicationName:{type:String},navigation:{type:Array,default:function(){return[]}},slotted:{type:Boolean,default:function(){return!1}},noLoginControls:{type:Boolean,default:function(){return!1}}},data:function(){return{navigation_open:!1}},methods:{toggle_navigation:function(){this.navigation_open=!this.navigation_open},close_navigation:function(){this.navigation_open=!1},logout:function(){this.axios.post("https://authentication.maximemoreillon.com/logout").then((function(){return location.reload()})).catch((function(t){return console.log(t)}))}},computed:{navigation_control_icon:function(){return this.navigation_open?"mdi-backburger":"mdi-menu"}}},l=u,c=(e("2e26"),e("2877")),p=Object(c["a"])(l,r,s,!1,null,null,null),g=p.exports,d={name:"app",components:{AppTemplate:g},data:function(){return{}}},m=d,f=Object(c["a"])(m,a,i,!1,null,null,null),_=f.exports,v=e("8c4f"),h=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"login_view"},[t.logged_in?e("form",{on:{submit:function(n){return n.preventDefault(),t.logout()}}},[e("div",{},[t._v("Logged in as: "+t._s(t.current_username))]),e("button",{attrs:{type:"button"},on:{click:function(n){return t.logout()}}},[t._v("Logout")])]):e("form",{on:{submit:function(n){return n.preventDefault(),t.login()}}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.input_data.username,expression:"input_data.username"}],attrs:{type:"text",placeholder:"username"},domProps:{value:t.input_data.username},on:{input:function(n){n.target.composing||t.$set(t.input_data,"username",n.target.value)}}}),e("input",{directives:[{name:"model",rawName:"v-model",value:t.input_data.password,expression:"input_data.password"}],attrs:{type:"password",placeholder:"password"},domProps:{value:t.input_data.password},on:{input:function(n){n.target.composing||t.$set(t.input_data,"password",n.target.value)}}}),e("input",{attrs:{type:"submit"},domProps:{value:t.login_button_text}}),e("div",{staticClass:"error_message"},[t._v(t._s(t.error_message))])])])},b=[],w={name:"Login",components:{},data:function(){return{logged_in:!1,input_data:{username:"",password:""},logging_in:!1,current_username:"test",error_message:""}},mounted:function(){},methods:{login:function(){var t=this;this.logging_in=!0,this.error_message="",this.axios.post("https://authentication.maximemoreillon.com/login",{username:this.input_data.username,password:this.input_data.password}).then((function(n){t.logging_in=!1,t.logged_in=n.data.logged_in,t.current_username=n.data.username,t.error_message=n.data.error,"jwt"in n.data&&(console.log("Received a cookie"),t.$cookies.set("jwt",n.data.jwt)),t.logged_in&&document.referrer&&(window.location.href=document.referrer)})).catch((function(n){t.error_message=n.response.data.error}))},logout:function(){var t=this;this.axios.post("https://authentication.maximemoreillon.com/logout").then((function(n){return t.logged_in=n.data.logged_in})).catch((function(t){return console.log(t)}))}},computed:{login_button_text:function(){return this.logging_in?"Logging in...":"Login"}}},y=w,x=(e("2c9e"),Object(c["a"])(y,h,b,!1,null,"3ddbda88",null)),C=x.exports;o["a"].use(v["a"]);var k=[{path:"/",name:"login",component:C}],O=new v["a"]({mode:"history",base:"/",routes:k}),j=O,L=e("2f62");o["a"].use(L["a"]);var P=new L["a"].Store({state:{},mutations:{},actions:{},modules:{}}),$=e("bc3a"),N=e.n($),S=e("a7fe"),M=e.n(S),T=e("2b27"),A=e.n(T);e("5363");o["a"].use(M.a,N.a),o["a"].use(A.a),o["a"].$cookies.config("7d","",".maximemoreillon.com"),o["a"].config.productionTip=!1,new o["a"]({router:j,store:P,render:function(t){return t(_)}}).$mount("#app")},adb5:function(t,n,e){}});
//# sourceMappingURL=app.6bd706cd.js.map