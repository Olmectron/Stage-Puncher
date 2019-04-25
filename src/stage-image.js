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
import { ParserMixin } from './parser-mixin.js';

class StageImage extends ParserMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

        }
        #stage-image{
            background-position: center;
            background-size: cover;
/*            border: 5px solid var(--paper-grey-900);*/
        }
      </style>

      <div id="stage-image" style$="border-radius: [[borderRadius]]; width: [[width]]; height: [[height]]; background-image: url('[[getImageUrl(noParse,imageUrl,stage,stage.imageUrl)]]');" />
    `;
  }
  
_widthChanged(width){
    this.set("height",(Number(width.replace("px",""))/1.777777777777).toFixed(0)+"px");
}
getImageUrl(noParse,imageUrl,stage){
  if(noParse){
    return stage.imageUrl;
  }
  else{
    return imageUrl;
  }
}
_fileBytesChanged(bytes){
  var context=this;
  var parsed=this.parseImage(bytes,function(dataUrl){
    context.set("imageUrl",dataUrl);
  });
  
  if(!parsed){
    this.set("imageUrl",null);
  }
}
  static get properties(){
      return{
        fileBytes:{
            type:Array,
            notify:true,
            observer: "_fileBytesChanged"
        },
        borderRadius:{
          type:String,
          notify:true,
          value: "5px 5px 0px 0px"
        },
        imageUrl:{
            type:String,
            notify:true
        },
        width:{
            type:String,
            notify:true,
            value: "200px",
            observer: "_widthChanged"
        },
        stage:{
          type:Object,
          notify:true
        },
        height:{
            type:String,
            notify:true
            
        }
      };
  }
}

window.customElements.define('stage-image', StageImage);
