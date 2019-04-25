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
import '@polymer/paper-ripple/paper-ripple';
import '@polymer/iron-selector/iron-selector';
import { ScreenMixin } from '../mixins/screen-mixin';
class PaginatorElement extends ScreenMixin(PolymerElement) {
  static get template() {
    return html`
      <style>
        :host {
          display: block;


        }
        .page[small-screen]{
          margin: 0 !important;
          border-radius: 0 !important;
          border: 1px solid white;
        }
        .page{
            user-select: none;
            width: 40px;
            height: 40px;
            font-weight: 500;
            font-size: 15px;
            background-color: white;
            border-radius: 50%;
            margin: 0px 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor:pointer;
            transition: background-color 200ms, color 200ms;
            position: relative;
        }
        paper-ripple{
            color: var(--paper-blue-500);
        }
        .arrow{
            background-color: var(--paper-indigo-500);
            color: white;
            font-size: 22px;
            font-weight: 600;
        }
        .page.iron-selected{
            background-color: var(--paper-blue-500);
            color: white;
            font-weight: 600;
        }
      </style>
      
      <div style="display: flex; height: 50px;">
    
      <template is="dom-if" if="[[!hid]]" restamp>
      <div class="page arrow" small-screen$="[[_smallScreen]]" on-click="goFirst"><paper-ripple></paper-ripple><<</div>
      <div class="page arrow" small-screen$="[[_smallScreen]]" on-click="goBack"><paper-ripple></paper-ripple><</div>
      <iron-selector id="selector" style="display: flex;" attr-for-selected="page" selected="{{selectedPage}}">
       <template is="dom-repeat" items="[[pages]]">
      <div page="[[item.page]]" class="page" small-screen$="[[_smallScreen]]"><paper-ripple></paper-ripple>[[item.page]]</div>
      </template>

      </iron-selector>

      <div class="page arrow" small-screen$="[[_smallScreen]]" on-click="goForward"><paper-ripple></paper-ripple>></div>
      <div class="page arrow" small-screen$="[[_smallScreen]]" on-click="goLast"><paper-ripple></paper-ripple>>></div>

      </template>
      </div>

    `;
  }
  goFirst(){
        this.set("selectedPage",1); 
  }
  goLast(){
      this.set("selectedPage",this.pagesLength);
  }
  goBack(){
      var page=this.selectedPage;
    if(page>1){
        this.set("selectedPage",page-1);
    }
  }
  goForward(){
    var page=this.selectedPage;
    if(page<this.pagesLength){
        this.set("selectedPage",page+1);
    }
  }
  _elementsChanged(total,perPage,startPage){
    var original=total/perPage;  
    var pages=Math.floor(total/perPage);
    
    if(original!=pages){
        pages++;
    }
    this.set("pagesLength",pages);
    var array=[];
    var maxPages=this.maxPages;
    if(pages<maxPages){
        maxPages=pages;
    }
    if(maxPages+startPage-1>this.maxPages){
        maxPages=this.maxPages;
    }
    var final=maxPages+startPage-1;
    if(final>pages){
        final=pages;
    }
    
    var sss=final-5;
    if(final<5){
        sss=0;
      //  final=0;
    }
    
    //console.warn("sssssssssss",sss,final);
    for(var i=sss;i<final;i++){
        var ppp=i+1;
        array.push({page:ppp});

    }
    
    this.set("pages",array);
    this.set("hid",true);
    var context=this;
    setTimeout(function(){
        context.set("hid",false);
    },10);


  }
  static get observers(){
      return[
        "_elementsChanged(totalElements,pageElements,startPage)"
      ];
  }
 
  _selChanged(pag){
      if(!pag){
          return;
      }
      
      if(pag>2){
        this.set("startPage",pag-2);

      }
      else{
          this.set("startPage",1);

      }
  }
  static get properties(){
      return{
          hid:{
            type:Boolean,
            notify:true,
            value: false
          },
          selectedPage:{
            type:Number,
            notify:true,
            observer: "_selChanged",
            value: 1,
            reflectToAttribute: true
          },
          startPage:{
            type:Number,
            notify:true
          },
          pages:{
            type:Array,
            notify:true
          },
          maxPages:{
            type:Number,
            notify:true,
            value: 5
          },
        totalElements:{
            type:Number,
            notify:true
        },
        pageElements:{
            type:Number,
            notify:true
        }
      };
  }

}

window.customElements.define('paginator-element', PaginatorElement);
