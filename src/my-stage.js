/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import { NavigationMixin } from './mixins/navigation-mixin.1.js';
import './stage-info.js';
import { ScreenMixin } from './mixins/screen-mixin.js';
class MyStage extends ScreenMixin(NavigationMixin(PolymerElement)) {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
        .card-shadow{
          box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
          transition: all 0.3s cubic-bezier(.25,.8,.25,1);
        }
        .card-shadow:hover{
          
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
        }
        .tag{
          margin: 12px;
          border-radius: 5px;
          color: white;
          font-weight: 500;
          padding: 6px 12px;
          cursor:pointer;

        }
        .tag iron-icon{
          margin-right: 12px;
        }
        .title[small-screen]{
          font-size: 35px;
          line-height: 40px;
          
        }
        .title{
          font-weight: 600;
          font-size: 75px;
          font-weight: 600;
          font-family: 'Roboto', sans-serif;
          line-height: 68px;
          padding-bottom: 8px;
          font-variant: small-caps;
/*                animation: pulse .6s infinite ease-out, flash .05s linear 1;*/

/*                text-shadow: black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px;*/
            text-shadow: white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px;

            
          color: var(--paper-grey-900);
      }
      </style>
       <div style="display: flex; align-items: center; justify-content: center;">
        <div style="text-align: center;">
          <img src="[[stage.imageUrl]]" class="card-shadow" style="border-radius: 15px; width: 500px; max-width: 95%; height: auto;" />
          <div class="carta">

          <paper-ripple></paper-ripple>
            <div style="position: absolute; top: 0; left: 0;  border-radius: 5px 0px 5px 0px; color: white; padding: 1px 6px;  background-color: var(--paper-grey-900);">
            [[stage.maker]]
            </div>
            
            <!--<div class="stage-name" style="color: white; font-weight: 600; position: absolute; bottom: 4px; right: 0px; left: 0px; text-align: center">
              [[stage.name]]
            </div>-->

            <div style="padding: 4px 12px; color: var(--paper-grey-800); text-align: center;">
              <div class="title" small-screen$="[[_smallScreen]]">[[stage.name]]</div>
              <div style="font-size: 25px; color: var(--paper-blue-900); font-weight: 500;">By [[stage.maker]]</div>
              <div style="font-size: 18px; font-weight: 500;">[[_processDate(stage.createTimestamp)]]</div>
              <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: center; padding-top: 12px;">
              
              <div class="tag" style="font-size: 14px; color: var(--paper-cyan-600); border: 2px solid var(--paper-cyan-600);  font-weight: 500;"><iron-icon icon="file-download"></iron-icon>100</div>
              <div class="tag" style="font-size: 14px; color: var(--paper-green-600); font-weight: 500;"><iron-icon icon="thumb-up"></iron-icon>100</div>
              <div class="tag" style="font-size: 14px; color: var(--paper-red-600); font-weight: 500;"><iron-icon icon="thumb-down"></iron-icon>100</div>


              </template>


            </div>


            </div>
        </div>
      </div>
    `;
  }
  _processDate(date){
    if(!date){
      return null;
    }
    var fecha=date.split(",")[0];
    var hora=date.split(",")[1];
    var fechaSplit=fecha.split("-");
    return this._monthsNames[fechaSplit[1]-1]+" "+fechaSplit[2]+", "+fechaSplit[0]+" "+hora;

  }
  _paramsChanged(params){
 //   console.log("Params",params);
    
    if(params && params.stageId){
      var context=this;
      if(this.lastStageQuery){
        this.lastStageQuery();
      }
      this.set("lastStageQuery",FirebaseUtils.queryDocument(this,{
        doc:"stages/"+params.stageId,
        observer: function(stage){
//          console.log("sss",stage);
          context.set("stage",stage);
        }
      }));
    }
    

  }
  _stageChanged(stage){
    console.warn("STT",stage);
  }
  static get properties(){
      return{
        _routeParams:{
          observer: "_paramsChanged"
        },
        _monthsNames:{
          type:Array,
          notify:true,
          value:["January","February","March","April","May","June","July","August","September","October","November","December"]
        },
        _pageName:{
          value: "stage"
        },
        stage:{
          type:Object,
          notify:true,
          observer: "_stageChanged",
          reflectToAttribute: true
        }
      };
  }
}

window.customElements.define('my-stage', MyStage);
