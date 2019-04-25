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
import '@polymer/paper-ripple/paper-ripple.js';

class UploadButton extends PolymerElement {
  static get template() {
    return html`
    <style>
    :host {
        position: relative;
      display: inline-block;
      cursor:pointer !important;
    }
    
    .input-file{
        opacity: 0;
background-color: red;
          position: absolute; 
          bottom: 0 !important; 
          right: 0 !important; 
          left: 0 !important; 
          right:0 !important;
          width: 100% !important;
          height: 100% !important;
          min-width: 100% !important;
          max-width: 100% !important;
          min-height: 100% !important;
          max-height: 100% !important;
          
      cursor:pointer !important;
    }
    .input-file[invisible]{
      pointer-events: none !important;
    }
  </style>
  <slot style="pointer-events: none;" id="slot"></slot>
  <paper-ripple></paper-ripple>
  <input type="file" id="_fileButton" on-click="clickSlot" invisible$="[[!enabled]]" on-change="_filesSelectedHandler" class="input-file"/>

    `;
  }
  static get properties() {
    return {
      options:{
        type:Object,
        notify:true,
        observer: "_optionsChanged"
      },
      photo:{
        type:Boolean,
        notify:true,
        value: false
      },
      enabled:{
        type:Boolean,
        notify:true,
        value: true
      }
    };
  }
  clickSlot(){
    if(!this.enabled){
      return;
    }
    this.$.slot.click();
  }

  _optionsChanged(options){
      if(options){
        if(options.fileTypes){
        //   console.log("Type",type);
          this.$._fileButton.accept=options.fileTypes.join(",");
//                inputFile.accept=type.join(",");
        }
      }
  }
  _filesSelectedHandler(e){
    var options=this.options;
    if(!options){
      console.error("You haven't set an options object");
      return;
    }
  /*  var type=options.fileTypes;
        var path=options.path;
        var name=options.name;
        var uploadDone=options.success;
        var errorFunction=options.error;
        var onPaused=options.onPaused;
        var onResumed=options.onResumed;
        var progressCallback=options.onProgress;*/

    if(e.target.files && e.target.files[0]){
          
      if(this.photo){
        FirebaseMixin.Storage._actualFirebasePhotoUpload(options,e.target.files[0],options.width,options.height);
        
      }
      else{
        FirebaseMixin.Storage._actualFirebaseUpload(options,e.target.files[0]);

      }
        
      }
      else{
          PolymerUtils.Toast.show("No seleccionaste ningún archivo");
      }
  }
}

window.customElements.define('upload-button', UploadButton);
