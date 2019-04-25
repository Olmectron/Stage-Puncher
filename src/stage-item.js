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
import './stage-image.js';
import { ParserMixin } from './parser-mixin.js';
import '@polymer/paper-ripple/paper-ripple';

class StageItem extends ParserMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: inline-flex;
          flex-direction: column;
          position: relative;
          user-select: none;
        }
        .stage-name{
          text-shadow: black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px;
          font-size: 18px;

        }
        .stage-name-card{
          text-shadow: black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px;
          font-size: 18px;

        }

        .carta{
          background-color: white;
          border-radius: 5px; 
          box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
        }
        .carta:hover{
          
          box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
          
        }
      </style>
        <div class="carta">

          <paper-ripple></paper-ripple>
            <stage-image file-bytes="[[fileBytes]]" no-parse="[[noParse]]" stage="[[stage]]" width="[[width]]"></stage-image>
            <div style="position: absolute; top: 0; left: 0;  border-radius: 5px 0px 5px 0px; color: white; padding: 1px 6px;  background-color: var(--paper-grey-900);">
            [[stage.maker]]
            </div>
            <template is="dom-if" if="[[stage.nsfw]]">
            <div style="position: absolute; top: 30px; left: 24px; right: 24px; height: 80px; display: flex; align-items: center; justify-content: center; font-size: 30px;  border-radius: 6px; color: white; padding: 1px 6px;  background-color: var(--paper-red-600);">
            NSFW
            </div>
            </template>
            
            
            <!--<div class="stage-name" style="color: white; font-weight: 600; position: absolute; bottom: 4px; right: 0px; left: 0px; text-align: center">
              [[stage.name]]
            </div>-->

            <div style="padding: 4px 12px; color: var(--paper-grey-800); text-align: left;">
              <div style="font-size: 18px;  font-weight: 600;">[[stage.name]]</div>
              <div style="font-size: 14px;  font-weight: 500; display: flex;">
              <div style="flex-grow: 100;">[[getNumber(stage.downloads)]] downloads</div>
              <div style="flex-grow: 1; color: var(--paper-teal-600);   ">[[getPercentage(stage.likes,stage.dislikes)]]%</div>

              
              </div>
            </div>


      </div>

    `;
  }
  getPercentage(likes,dislikes){
    if(!likes){
      likes=0;
    }
    if(!dislikes){
      dislikes=0;
    }
    var total=likes+dislikes;
    if(total==0){
      return 0;
    }
    return Math.floor((likes/total)*100);
  }
  constructor(){
    super();
    
  }
  getNumber(number){
    if(!number){
      return 0;
    }
    return number;
  }
  _fileBytesChanged(bytes){
    this.set("stage",this.parseData(bytes));
  }
  _widthChanged(width){
    this.updateStyles({
        '--item-width': width
          });
  }
  static get properties(){
        return{
            fileBytes:{
                type:Array,
                notify:true,
                observer: "_fileBytesChanged"
            },
            noParse:{
              type:Boolean,
              notify:true,
              value: false

            },
            
            width:{
                type:String,
                notify:true,
                value: "200px",
                observer: "_widthChanged"
            },
            stage:{
              type:Object,
              notify:true,
              value:{}
            }
        };
    }
}

window.customElements.define('stage-item', StageItem);
