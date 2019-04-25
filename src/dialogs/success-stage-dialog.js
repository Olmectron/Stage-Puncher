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
import '../shared-styles.js';
import '../stage-item.js';
import '@polymer/paper-ripple/paper-ripple';
class SuccessStageDialog extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>

      <stage-item stage="[[stage]]" width="250px" no-parse></stage-item>
      <div style="margin: 12px 0px;"><input spellcheck="false" id="urlInput" style="padding: 4px 8px;" value="[[getUrl(stageKey)]]" /><span on-click="copyToClipboard" style="height: 30px; border-radius: 5px; user-select: none; margin-left: 8px; padding: 0px 16px; cursor:pointer; position: relative;">
      <paper-ripple></paper-ripple>Copy</span></div>  

    `;
  }
  constructor(stage){
      super();
      this.set("stageKey",stage);
      //console.warn("Sage",stage);

  }
  copyToClipboard(){
    var copyText = this.shadowRoot.querySelector("#urlInput");
    copyText.select();
  
    document.execCommand("copy");
  
  }
  getUrl(stageKey){
      return "https://smash-stages.firebaseapp.com/stage?stageId="+stageKey;
  }
  navigateToStage(e){
    var stage=this.stage;
    if(stage)
    NavigationUtils.navigate("stage",{stageId:stage._key});
  }
  _stageKeyChanged(key){
    var db=firebase.firestore();
    var docRef = db.collection("stages").doc(key);
    var context=this;
docRef.get().then(function(doc) {
    var data=doc.data();
    if(data){
        data._key=data.id;
    }
    context.set("stage",data);
}).catch(function(error) {
    console.log("Error getting document:", error);
});
  }
  static get properties(){
      return{
        stage:{
            type:Object,
            notify:true
        },  
        stageKey:{
            type:String,
            notify:true,
            observer: "_stageKeyChanged"
        },
        _dialogOptions:{
            type:Object,
            notify:true,
            value:{
                title:{
                    text:"Upload Success!",
                    style:"color: white; background-color: var(--paper-green-600);"
                },
                message:{
                    text: "Your stage was uploaded successfully. Copy the URL below if you want to share it:"
                },
                style: "width: 320px; max-width: 95%;",
                positiveButton:{
                    text:"Cerrar"
                }
            }
        }
      };
  }
}

window.customElements.define('success-stage-dialog', SuccessStageDialog);
