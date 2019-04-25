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
import './stage-item.js';
import '@polymer/iron-selector/iron-selector';
import { ParserMixin } from './parser-mixin.js';
import { FirebaseMixin } from './firebase-mixin.js';
class MySharedStages extends FirebaseMixin(ParserMixin(PolymerElement)) {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
        stage-item{
          cursor:pointer;
        }
      </style>

        <!--<input type="file" id="file-selector" accept=".bin" on-change="_inputChanged"/>-->
        
        <iron-selector attr-for-selected="stage" selected="{{selectedStage}}" style="display: flex; align-items: center; justify-content: center; flex-wrap: wrap;">
        <template is="dom-repeat" items="[[stages]]">
        <!--<stage-item style="margin: 8px;" file-bytes="[[_getFileBytes(item.data)]]" width="250px"></stage-item>-->
        <stage-item on-click="downloadFile" style="margin: 8px;" stage="[[item]]" width="250px" no-parse></stage-item>

        </template>
        </iron-selector>

        <div style="height: 120px;"></div>
      
    `;
  }
  constructor(){
    super();
    /*var commentsRef = firebase.database().ref('stages');
    var context=this;
commentsRef.on('child_added', function(data) {
  context.push("stages",data.val());
});*/
FirebaseUtils.queryCollection(this,{
  collection: "stages",
  arrayName: "stages"
})
  }
 
  downloadFile(e){
    var stage=e.model.item;
    this.downloadBinaryFile(stage);
  }
  
  

 
  static get properties(){
    return{
      fileBytes:{
        type:Array,
        notify:true
      },
      selectedStage:{
        type:Object,
        notify:true,
        reflectToAttribute: true 
      },
      fileString:{
        type:Array,
        notify:true
      },
      stages:{
        type:Array,
        notify:true,
        value:[]
      }
      
    };
  }
}

window.customElements.define('my-shared-stages', MySharedStages);
