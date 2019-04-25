!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(require("@firebase/app")):"function"==typeof define&&define.amd?define(["@firebase/app"],t):t((e=e||self).firebase)}(this,function(s){"use strict";try{(function(){s=s&&s.hasOwnProperty("default")?s.default:s;var r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)};function t(i,a,u,s){return new(u||(u=Promise))(function(e,t){function n(e){try{o(s.next(e))}catch(e){t(e)}}function r(e){try{o(s.throw(e))}catch(e){t(e)}}function o(t){t.done?e(t.value):new u(function(e){e(t.value)}).then(n,r)}o((s=s.apply(i,a||[])).next())})}function d(n,r){var o,i,a,e,u={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return e={next:t(0),throw:t(1),return:t(2)},"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function t(t){return function(e){return function(t){if(o)throw new TypeError("Generator is already executing.");for(;u;)try{if(o=1,i&&(a=2&t[0]?i.return:t[0]?i.throw||((a=i.return)&&a.call(i),0):i.next)&&!(a=a.call(i,t[1])).done)return a;switch(i=0,a&&(t=[2&t[0],a.value]),t[0]){case 0:case 1:a=t;break;case 4:return u.label++,{value:t[1],done:!1};case 5:u.label++,i=t[1],t=[0];continue;case 7:t=u.ops.pop(),u.trys.pop();continue;default:if(!(a=0<(a=u.trys).length&&a[a.length-1])&&(6===t[0]||2===t[0])){u=0;continue}if(3===t[0]&&(!a||t[1]>a[0]&&t[1]<a[3])){u.label=t[1];break}if(6===t[0]&&u.label<a[1]){u.label=a[1],a=t;break}if(a&&u.label<a[2]){u.label=a[2],u.ops.push(t);break}a[2]&&u.ops.pop(),u.trys.pop();continue}t=r.call(n,u)}catch(e){t=[6,e],i=0}finally{o=a=0}if(5&t[0])throw t[1];return{value:t[0]?t[1]:void 0,done:!0}}([t,e])}}}var h={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"},y=function(o){function i(e,t,n){var r=o.call(this,t)||this;return Object.setPrototypeOf(r,i.prototype),r.code=e,r.details=n,r}return function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}(i,o),i}(Error);var n=function(){function e(e){this.app=e}return e.prototype.getAuthToken=function(){return t(this,void 0,void 0,function(){var t;return d(this,function(e){switch(e.label){case 0:return e.trys.push([0,2,,3]),[4,this.app.INTERNAL.getToken()];case 1:return(t=e.sent())?[2,t.accessToken]:[2,void 0];case 2:return e.sent(),[2,void 0];case 3:return[2]}})})},e.prototype.getInstanceIdToken=function(){return t(this,void 0,void 0,function(){var t;return d(this,function(e){switch(e.label){case 0:return e.trys.push([0,2,,3]),this.app.messaging?[4,this.app.messaging().getToken()]:[2,void 0];case 1:return(t=e.sent())?[2,t]:[2,void 0];case 2:return e.sent(),[2,void 0];case 3:return[2]}})})},e.prototype.getContext=function(){return t(this,void 0,void 0,function(){var t,n;return d(this,function(e){switch(e.label){case 0:return[4,this.getAuthToken()];case 1:return t=e.sent(),[4,this.getInstanceIdToken()];case 2:return n=e.sent(),[2,{authToken:t,instanceIdToken:n}]}})})},e}();function o(e,t){var n={};for(var r in e)e.hasOwnProperty(r)&&(n[r]=t(e[r]));return n}var i=function(){function e(){}return e.prototype.encode=function(e){var t=this;if(null==e)return null;if(e instanceof Number&&(e=e.valueOf()),"number"==typeof e&&isFinite(e))return e;if(!0===e||!1===e)return e;if("[object String]"===Object.prototype.toString.call(e))return e;if(Array.isArray(e))return e.map(function(e){return t.encode(e)});if("function"==typeof e||"object"==typeof e)return o(e,function(e){return t.encode(e)});throw new Error("Data cannot be encoded in JSON: "+e)},e.prototype.decode=function(e){var t=this;if(null===e)return e;if(e["@type"])switch(e["@type"]){case"type.googleapis.com/google.protobuf.Int64Value":case"type.googleapis.com/google.protobuf.UInt64Value":var n=parseFloat(e.value);if(isNaN(n))throw new Error("Data cannot be decoded from JSON: "+e);return n;default:throw new Error("Data cannot be decoded from JSON: "+e)}return Array.isArray(e)?e.map(function(e){return t.decode(e)}):"function"==typeof e||"object"==typeof e?o(e,function(e){return t.decode(e)}):e},e}();var e,a=function(){function e(e,t){void 0===t&&(t="us-central1"),this.app_=e,this.region_=t,this.serializer=new i,this.emulatorOrigin=null,this.contextProvider=new n(e)}return Object.defineProperty(e.prototype,"app",{get:function(){return this.app_},enumerable:!0,configurable:!0}),e.prototype._url=function(e){var t=this.app_.options.projectId,n=this.region_;return null===this.emulatorOrigin?"https://"+n+"-"+t+".cloudfunctions.net/"+e:this.emulatorOrigin+"/"+t+"/"+n+"/"+e},e.prototype.useFunctionsEmulator=function(e){this.emulatorOrigin=e},e.prototype.httpsCallable=function(t,n){var r=this;return function(e){return r.call(t,e,n||{})}},e.prototype.postJSON=function(r,o,i){return t(this,void 0,void 0,function(){var t,n;return d(this,function(e){switch(e.label){case 0:i.append("Content-Type","application/json"),e.label=1;case 1:return e.trys.push([1,3,,4]),[4,fetch(r,{method:"POST",body:JSON.stringify(o),headers:i})];case 2:return t=e.sent(),[3,4];case 3:return e.sent(),[2,{status:0,json:null}];case 4:n=null,e.label=5;case 5:return e.trys.push([5,7,,8]),[4,t.json()];case 6:return n=e.sent(),[3,8];case 7:return e.sent(),[3,8];case 8:return[2,{status:t.status,json:n}]}})})},e.prototype.call=function(l,f,p){return t(this,void 0,void 0,function(){var t,r,o,i,a,u,s,c;return d(this,function(e){switch(e.label){case 0:return t=this._url(l),f=this.serializer.encode(f),r={data:f},o=new Headers,[4,this.contextProvider.getContext()];case 1:return(i=e.sent()).authToken&&o.append("Authorization","Bearer "+i.authToken),i.instanceIdToken&&o.append("Firebase-Instance-ID-Token",i.instanceIdToken),a=p.timeout||7e4,[4,Promise.race([this.postJSON(t,r,o),(n=a,new Promise(function(e,t){setTimeout(function(){t(new y("deadline-exceeded","deadline-exceeded"))},n)}))])];case 2:if(u=e.sent(),s=function(e,t,n){var r=function(e){if(200<=e&&e<300)return"ok";switch(e){case 0:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return"internal";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}(e),o=r,i=void 0;try{var a=t.error;if(a){var u=a.status;if("string"==typeof u){if(!h[u])return new y("internal","internal");r=h[u]}o=u;var s=a.message;"string"==typeof s&&(o=s),void 0!==(i=a.details)&&(i=n.decode(i))}}catch(e){}return"ok"===r?null:new y(r,o,i)}(u.status,u.json,this.serializer))throw s;if(!u.json)throw new y("internal","Response is not valid JSON object.");if(void 0===(c=u.json.data)&&(c=u.json.result),void 0===c)throw new y("internal","Response is missing data field.");return[2,{data:this.serializer.decode(c)}]}var n})})},e}();function u(e,t,n){return new a(e,n)}e={Functions:a},s.INTERNAL.registerService("functions",u,e,void 0,!0)}).apply(this,arguments)}catch(e){throw console.error(e),new Error("Cannot instantiate firebase-functions - be sure to load firebase-app.js first.")}});
//# sourceMappingURL=firebase-functions.js.map