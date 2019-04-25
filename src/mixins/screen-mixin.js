import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

import '@polymer/iron-media-query/iron-media-query.js';

let internalMixinScreen = function(superClass) {
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
          var queryContainer=document.createElement("iron-media-query");
          var context=this;
          queryContainer.query="(max-width: 640px)";
          
          queryContainer.addEventListener("query-matches-changed",function(e){
           //   console.log("Query matches",e);
              context.set("_smallScreen",e.detail.value);
          });
          
         this.shadowRoot.appendChild(queryContainer);
      }
      _smallScreenChanged(screen){
      //    console.log("New small screen in mixin",screen);
      }
      static get properties(){
          return{
            _smallScreen:{
                type:Boolean,
                notify:true,
                reflectToAttribute: true,
                observer: "_smallScreenChanged"
            }
          };
      }
    }
  }
  export const ScreenMixin = dedupingMixin(internalMixinScreen);