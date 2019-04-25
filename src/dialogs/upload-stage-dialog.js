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
import { FileMixin } from '../mixins/file-mixin.js';
import { FirebaseMixin } from '../firebase-mixin.js';
import { ParserMixin } from '../parser-mixin.js';
import '@polymer/paper-input/paper-input';

import '@polymer/paper-ripple/paper-ripple';
import '@polymer/paper-checkbox/paper-checkbox';
import '@polymer/iron-icons/iron-icons';
import './success-stage-dialog.js';

class UploadStageDialog extends ParserMixin(FirebaseMixin(FileMixin(PolymerElement))) {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          --paper-input-container-disabled:{
            opacity: 1 !important;  
            color: var(--paper-indigo-500);
            border-color: var(--paper-indigo-500);
          };
          --paper-input-container-input-disabled:{
            color: var(--paper-blue-grey-800);
            opacity: 1 !important;  
          };
        }
        
      </style>
      
      <div style="position: relative;display: flex; align-items: center; justify-content: center; overflow: hidden;">
      <paper-button style="color: white; background-color: var(--paper-teal-500); font-weight: 500;"><iron-icon style="margin-right: 8px;" icon="file-upload"></iron-icon>Choose file</paper-button>
      <div style="position: absolute; left: 0px; right: 0px; bottom: 0px; top: 0px; cursor:pointer;">
      <input style="cursor:pointer; width: 100%; height: 100%; opacity: 0;background-color: red; "type="file" id="file-selector" accept=".bin" on-change="_inputFileChanged"/>
      <paper-ripple style="color: white;"></paper-ripple> 
      </div>

      </div>

      <paper-input label="Name" value="[[_stage.name]]" disabled></paper-input>

      <!--<paper-input label="Description" value="{{description}}"></paper-input>-->
  
      <paper-input label="Maker" value="[[_stage.maker]]" disabled></paper-input>
      <paper-checkbox checked="{{nsfw}}" style="margin: 8px 0px;">Not suitable for work</paper-checkbox>
  
      
      <stage-image border-radius="5px" width="300px" file-bytes="[[_fileBytes]]"></stage-image>
        
      
    `;
  }
  static get properties(){
      return{
        nsfw:{
          type:Boolean,
          notify:true,
          value: true
        },
        _dialogOptions:{
            type:Object,
            notify:true,
            value:{
                title:{
                    text:"Upload Stage",
                    style:"color: white; background-color: var(--paper-blue-700);"
                },
                message:{
              //    text:"Upload a binary file from a stage you want to share online. Your stage will be shared anonymously, and you won't be able to edit it afterwards. (<b>Log in</b> if you want to be able to see and edit your uploaded stages)"
                  text:"Upload a binary file from a stage you want to share online. Your stage will be shared anonymously."
                },
                saveSpinner:{
                  message:"Uploading..."
                },
                style:"width: 350px; max-width: 95%;",
                positiveButton:{
                    text:"Upload",
                    action: function(dialog,element){
                      dialog.setSaving(true);
                      element.submitUpload({nsfw:element.nsfw},function(stageKey){
                        dialog.close();
                        PolymerUtils.Toast.show("Success uploading stage '"+element._stage.name+"'!");
                        
                        PolymerUtils.Dialog.createAndShow({element:"success-stage-dialog",params:[stageKey]});

                      },function(err){
                        console.error("ERROR WHEN UPLOADING",err);
                        dialog.setSaving(false);
                        PolymerUtils.Toast.show("There was an error uploading to the server");
                      });

                    }
                },
                negativeButton:{
                    text:"Cancel"
                }
            }
        },
      };
  }
}

window.customElements.define('upload-stage-dialog', UploadStageDialog);
