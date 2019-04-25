import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

import '@polymer/app-route/app-location.js';

let internalMixinNavigation = function(superClass) {
    return class extends superClass {
      constructor(){
          super();
         
      }
/*      static get template(){
          return html`<iron-media-query 
          query="(max-width: 640px)" 
          query-matches="{{_smallScreen}}"></iron-media-query>
          `;
      }*/
      ready(){
          super.ready();
        
          var queryContainer=document.createElement("app-location");
          var context=this;
        queryContainer.addEventListener("query-params-changed",function(e){
            var params=e.detail.value;
            //context.set("paramsActuales",null);
            context.set("paramsActuales",params);
          
        });
        queryContainer.addEventListener("route-changed",function(e){
            //context.set("rutaActual",null);
            context.set("rutaActual",e.detail.value);
        });
       /*   queryContainer.addEventListener("route-changed",function(e){
           //   console.log("Query matches",e);
                var route=e.detail.value;
                if(route.path){
                    var path=route.path;
                    if(path.startsWith("/")){
                        path=path.substring(1);
                    }
                    if(path.endsWith("/")){
                        path=path.substring(-1);
                    }
                }
                var array=path.split("/");
                var spliced=array.splice(0,1);
                
                context.set("_routeParams",null);
                if(context._pageName){
                    if(typeof(spliced[0])!=undefined && context._pageName==spliced[0]){
                        
                    context.set("_routeParams",array);
                    }
                }
                else{
              
                    context.set("_routeParams",array);
                }  
                

          });*/
          
         this.shadowRoot.appendChild(queryContainer);
      }
      static get observers(){
            return[
                "_observeRutaParams(rutaActual,paramsActuales)"
            ];
      }
      _observeRutaParams(route,params){
          var context=this;
          var path=null;
          if(!route){
              return;
          }
        if(route.path){
            path=route.path;
            if(path.startsWith("/")){
                path=path.substring(1);
            }
            if(path.endsWith("/")){
                path=path.substring(-1);
            }
        }
        if(!path){
            //return;
            path="";
        }
        var array=path.split("/");
        var spliced=array.splice(0,1);
       // context.set("_routeParams",null);
            if(context._pageName){
                if(typeof(spliced[0])!=undefined && context._pageName==spliced[0]){
                    
                context.set("_routeParams",params);
                }
            }
            else{
          
                context.set("_routeParams",params);
            }  
      }
      _innerParamsNavigationObserver(params){
        for(var i=0;i<this._routeParamsChangeListeners.length;i++){
            var listener=this._routeParamsChangeListeners[i];
            this._checkParamsListenerAction(listener);
        }
      }
      _bindParamsAction(listener){
   
          this.push("_routeParamsChangeListeners",listener);
          this._checkParamsListenerAction(listener);
      }
      _checkParamsListenerAction(listener){
          var bl=listener.checker(this._routeParams);
          return listener.action(bl);
      }
      static get properties(){
          return{
            _routeParams:{
                type:Boolean,
                notify:true,
                reflectToAttribute: true,
                observer: "_innerParamsNavigationObserver"
            },
            _routeParamsChangeListeners:{
                type:Array,
                notify:true,
                value: []
            }
          };
      }
    }
  }
  export const NavigationMixin = dedupingMixin(internalMixinNavigation);