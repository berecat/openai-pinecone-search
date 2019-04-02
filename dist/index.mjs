import e from"ra-realtime";import"firebase/firestore";import{Observable as r}from"rxjs";import{apps as t,initializeApp as n,app as o,auth as i}from"firebase/app";import"firebase/auth";import{CREATE as a,DELETE as s,DELETE_MANY as c,GET_LIST as u,GET_MANY as h,GET_MANY_REFERENCE as p,GET_ONE as l,UPDATE as f,UPDATE_MANY as d,AUTH_LOGIN as m,AUTH_LOGOUT as y,AUTH_ERROR as v,AUTH_CHECK as g}from"react-admin";function P(e,r){A&&console.log(e,r)}var b,A=!1,w=function(e){this.resources={},this.app=t.length?o():n(e),this.db=this.app.firestore()};function j(e){if(!e)throw new Error("Please pass the Firebase config.json object to the FirebaseDataProvider");return A=e.debug,b=new w(e),function(e,r,t){try{return Promise.resolve(b.initPath(r)).then(function(){switch(e){case h:return b.apiGetMany(r,t);case p:return b.apiGetManyReference(r,t);case u:return b.apiGetList(r,t);case l:return b.apiGetOne(r,t);case a:return b.apiCreate(r,t);case f:return b.apiUpdate(r,t);case d:return b.apiUpdateMany(r,t);case s:return b.apiDelete(r,t);case c:return b.apiDeleteMany(r,t);default:return{}}})}catch(e){return Promise.reject(e)}}}w.prototype.parseFireStoreDocument=function(e){var r=e.data();return Object.keys(r).forEach(function(e){var t=r[e];t&&t.toDate&&t.toDate instanceof Function&&(r[e]=t.toDate().toISOString())}),Object.assign({},{id:e.id},r)},w.prototype.initPath=function(e){try{var r=this;return new Promise(function(t){if(r.resources[e])return t();var n=r.db.collection(e),o=r.getCollectionObservable(n);o.subscribe(function(n){var o=n.docs.map(function(e){return r.parseFireStoreDocument(e)});r.setList(o,e),t()});var i={collection:n,list:[],observable:o,path:e};r.resources[e]=i,P("initPath",{path:e,r:i,"this.resources":r.resources})})}catch(e){return Promise.reject(e)}},w.prototype.apiGetList=function(e,r){try{var t=this;return Promise.resolve(t.tryGetResource(e)).then(function(n){var o=n.list;if(null!=r.sort){var i=r.sort;t.sortArray(o,i.field,"ASC"===i.order?"asc":"desc")}P("apiGetList",{resourceName:e,resource:n,params:r});var a=t.filterArray(o,r.filter),s=(r.pagination.page-1)*r.pagination.perPage;return{data:a.slice(s,s+r.pagination.perPage),total:n.list.length}})}catch(e){return Promise.reject(e)}},w.prototype.apiGetOne=function(e,r){try{return Promise.resolve(this.tryGetResource(e)).then(function(t){P("apiGetOne",{resourceName:e,resource:t,params:r});var n=t.list.filter(function(e){return e.id===r.id});if(n.length<1)throw new Error("react-admin-firebase: No id found matching: "+r.id);return{data:n.pop()}})}catch(e){return Promise.reject(e)}},w.prototype.apiCreate=function(e,r){try{return Promise.resolve(this.tryGetResource(e)).then(function(t){return P("apiCreate",{resourceName:e,resource:t,params:r}),Promise.resolve(t.collection.add(r.data)).then(function(e){return{data:Object.assign({},r.data,{id:e.id})}})})}catch(e){return Promise.reject(e)}},w.prototype.apiUpdate=function(e,r){try{var t=r.id;return delete r.data.id,Promise.resolve(this.tryGetResource(e)).then(function(n){return P("apiUpdate",{resourceName:e,resource:n,params:r}),n.collection.doc(t).update(r.data),{data:Object.assign({},r.data,{id:t})}})}catch(e){return Promise.reject(e)}},w.prototype.apiUpdateMany=function(e,r){try{return delete r.data.id,Promise.resolve(this.tryGetResource(e)).then(function(t){P("apiUpdateMany",{resourceName:e,resource:t,params:r});for(var n=[],o=0,i=r.ids;o<i.length;o+=1){var a=i[o];t.collection.doc(a).update(r.data),n.push(Object.assign({},r.data,{id:a}))}return{data:n}})}catch(e){return Promise.reject(e)}},w.prototype.apiDelete=function(e,r){try{return Promise.resolve(this.tryGetResource(e)).then(function(t){return P("apiDelete",{resourceName:e,resource:t,params:r}),t.collection.doc(r.id).delete(),{data:r.previousData}})}catch(e){return Promise.reject(e)}},w.prototype.apiDeleteMany=function(e,r){try{var t=this;return Promise.resolve(t.tryGetResource(e)).then(function(n){P("apiDeleteMany",{resourceName:e,resource:n,params:r});for(var o=[],i=t.db.batch(),a=0,s=r.ids;a<s.length;a+=1){var c=s[a];i.delete(n.collection.doc(c)),o.push({id:c})}return i.commit(),{data:o}})}catch(e){return Promise.reject(e)}},w.prototype.apiGetMany=function(e,r){try{return Promise.resolve(this.tryGetResource(e)).then(function(t){P("apiGetMany",{resourceName:e,resource:t,params:r});var n=new Set(r.ids);return{data:t.list.filter(function(e){return n.has(e.id)})}})}catch(e){return Promise.reject(e)}},w.prototype.apiGetManyReference=function(e,r){try{var t=this;return Promise.resolve(t.tryGetResource(e)).then(function(n){P("apiGetManyReference",{resourceName:e,resource:n,params:r});var o=n.list,i=r.target,a=r.id,s=o.filter(function(e){return e[i]===a});if(null!=r.sort){var c=r.sort;t.sortArray(o,c.field,"ASC"===c.order?"asc":"desc")}var u=(r.pagination.page-1)*r.pagination.perPage;return{data:s.slice(u,u+r.pagination.perPage),total:s.length}})}catch(e){return Promise.reject(e)}},w.prototype.GetResource=function(e){return this.tryGetResource(e)},w.prototype.sortArray=function(e,r,t){e.sort(function(e,n){var o=e[r]?e[r].toString().toLowerCase():"",i=n[r]?n[r].toString().toLowerCase():"";return o>i?"asc"===t?-1:1:o<i?"asc"===t?1:-1:0})},w.prototype.filterArray=function(e,r){if("{}"==JSON.stringify(r))return e;var t=Object.keys(r);return e.filter(function(e){return t.reduce(function(t,n){var o=r[n].toLowerCase(),i=e[n];if(null==i)return!1;var a=i.toLowerCase().includes(o);return t||a},!1)})},w.prototype.setList=function(e,r){try{return Promise.resolve(this.tryGetResource(r)).then(function(r){r.list=e})}catch(e){return Promise.reject(e)}},w.prototype.tryGetResource=function(e){var r=this.resources[e];if(!r)throw new Error('react-admin-firebase: Cant find resource: "'+e+'"');return r},w.prototype.getCollectionObservable=function(e){return r.create(function(r){return e.onSnapshot(r)})};var G=function(r,t){return e(function(e,r){return function(t,n,o){if((!r||!Array.isArray(r.watch)||r.watch.includes(n))&&!(r&&Array.isArray(r.dontwatch)&&r.dontwatch.includes(n)))return{subscribe:function(r){var i=b.GetResource(n).observable.subscribe(function(){e(t,n,o).then(function(e){return r.next(e)}).catch(function(e){return r.error(e)})});return{unsubscribe:function(){i.unsubscribe()}}}}}}(r,t))};function C(e,r){try{var t=e()}catch(e){return r(e)}return t&&t.then?t.then(void 0,r):t}function L(e,r){R&&console.log("FirebaseAuthProvider: "+e,r)}var R=!1,D=function(e){L("Auth Client: initializing..."),this.app=t.length?o():n(e),this.auth=i()};function O(e){if(!e)throw new Error("Please pass the Firebase config.json object to the FirebaseAuthProvider");R=e.debug;var r=new D(e);return function(e,t){try{switch(L("Auth Event: ",{type:e,params:t}),e){case m:return Promise.resolve(r.HandleAuthLogin(t)).then(function(){});case y:return Promise.resolve(r.HandleAuthLogout(t)).then(function(){});case v:return Promise.resolve(r.HandleAuthError(t)).then(function(){});case g:return Promise.resolve(r.HandleAuthCheck(t)).then(function(){});default:throw new Error("Unhandled auth type:"+e)}}catch(e){return Promise.reject(e)}}}D.prototype.HandleAuthLogin=function(e){try{var r=this,t=e.username,n=e.password;return C(function(){return Promise.resolve(r.auth.signInWithEmailAndPassword(t,n)).then(function(e){L("HandleAuthLogin: user sucessfully logged in",{user:e})})},function(){throw L("HandleAuthLogin: invalid credentials",{params:e}),new Error("Login error: invalid credentials")})}catch(e){return Promise.reject(e)}},D.prototype.HandleAuthLogout=function(e){try{return Promise.resolve(this.auth.signOut()).then(function(){})}catch(e){return Promise.reject(e)}},D.prototype.HandleAuthError=function(e){},D.prototype.HandleAuthCheck=function(e){try{var r=this,t=C(function(){return Promise.resolve(r.getUserLogin()).then(function(e){L("HandleAuthCheck: user is still logged in",{user:e})})},function(e){L("HandleAuthCheck: ",{e:e})});return t&&t.then?t.then(function(){}):void 0}catch(e){return Promise.reject(e)}},D.prototype.getUserLogin=function(){try{var e=this;return new Promise(function(r,t){e.auth.onAuthStateChanged(function(e){e?r(e):t("User not logged in")})})}catch(e){return Promise.reject(e)}};export{G as FirebaseRealTimeSaga,j as FirebaseDataProvider,O as FirebaseAuthProvider};
//# sourceMappingURL=index.mjs.map
