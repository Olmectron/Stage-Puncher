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

class UploadStageDialog extends FileMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

        }
      </style>
      <paper-input label="Name" value="{{name}}"></paper-input>
      <paper-input label="Description" value="{{description}}"></paper-input>
      
      <input type="file" id="file-selector" accept=".bin" on-change="_inputFileChanged"/>
      <stage-image file-bytes="[[_fileBytes]]"></stage-image>
        
      
    `;
  }
  static get properties(){
      return{
        _dialogOptions:{
            type:Object,
            notify:true,
            value:{
                title:{
                    text:"Upload Stage",
                    style:"color: white; background-color: var(--paper-blue-700);"
                },
                message:{
                    text:"Upload a binary file from a stage you want to share online. Your stage will be shared anonymously, and you won't be able to edit it afterwards. (<b>Log in</b> if you want to be able to see and edit your uploaded stages)"
                },
                style:"width: 350px; max-width: 95%;",
                positiveButton:{
                    text:"Subir"
                },
                negativeButton:{
                    text:"Cancelar"
                }
            }
        },
      };
  }
}

window.customElements.define('upload-stage-dialog', UploadStageDialog);
