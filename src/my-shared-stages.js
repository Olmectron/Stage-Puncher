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
import '@polymer/paper-dropdown-menu/paper-dropdown-menu';
import '@polymer/paper-listbox/paper-listbox';
import '@polymer/paper-item/paper-item';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/iron-icons/iron-icons';
import '@polymer/paper-radio-group/paper-radio-group';
import '@polymer/paper-radio-button/paper-radio-button';
import './components/paginator-element.js';
import '@polymer/paper-checkbox/paper-checkbox';
import { AuthMixin } from './mixins/auth-mixin.js';
class MySharedStages extends AuthMixin(FirebaseMixin(ParserMixin(PolymerElement))) {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 0px;
        }
        stage-item{
          cursor:pointer;
        }
      </style>

      <div style="display: flex; padding: 10px 24px; padding-bottom: 0px; flex-wrap: wrap; align-items: flex-end; background-color: white; position: relative;" class$="[[getClass(collapseOpened)]]"> 
            
      <paper-input value="{{search}}" style="flex-grow: 9; margin-right: 8px;" label="Stage Search"></paper-input>
      
        <!--<div on-click="showCollapse" style="display: flex; align-items: center;position: absolute; bottom: 0; left: 24px; font-size: 13px; font-weight: 500; cursor:pointer; color: var(--paper-indigo-500);">
        
        <template is="dom-if" if="[[collapseOpened]]"><iron-icon icon="icons:arrow-drop-up"></iron-icon></template>
        <template is="dom-if" if="[[!collapseOpened]]"><iron-icon icon="icons:arrow-drop-down"></iron-icon></template>
        
        <span>Más opciones</span></div>-->
        <!--</template>-->
               
      <template is="dom-if" if="[[isOrden(direccionOrden,'asc')]]">
      <paper-icon-button onmouseover="PolymerUtils.Tooltip.show(event,'Ascending order')" on-click="changeOrden" class="orden-button" icon="icons:arrow-upward"></paper-icon-button>
    </template>
    
    <template is="dom-if" if="[[isOrden(direccionOrden,'desc')]]">
    <paper-icon-button onmouseover="PolymerUtils.Tooltip.show(event,'Descending order')" on-click="changeOrden" class="orden-button" icon="icons:arrow-downward"></paper-icon-button>
        </template>

        
      <paper-dropdown-menu label="Order by" style="flex-grow: 2;" attr-for-selected="name">
      <paper-listbox slot="dropdown-content" style="cursor:pointer;" attr-for-selected="name" selected="{{filtroDropdown}}" class="dropdown-content">
        <paper-item name="name">Stage Name</paper-item>
        <paper-item name="maker">Stage Maker</paper-item>
        <paper-item name="upload">Upload Timestamp</paper-item>
        <!--<paper-item name="created">Create Timestamp</paper-item>-->
        
        <paper-item name="downloads">Downloads</paper-item>
        <paper-item name="popular">Popular</paper-item>
        
        <!--<paper-item name="status">Status de última visita</paper-item>-->
      </paper-listbox>
    </paper-dropdown-menu>

 

      </div>


      <div style="padding: 0px 24px; padding-bottom: 8px; background-color: white;" class="corto">

     

    
  <paper-radio-group selected="{{filtroTipo}}">
  <paper-radio-button name="all">All</paper-radio-button>
  <paper-radio-button name="small">Small</paper-radio-button>
  <paper-radio-button name="medium">Medium</paper-radio-button>
  <paper-radio-button name="big">Big</paper-radio-button>
  
  </paper-radio-group>
  <paper-checkbox checked="{{myStages}}" style="margin: 0px 12px;">My Uploaded Stages</paper-checkbox>
  </div>



  <div style="overflow-x: auto;">
  <div style="display: flex; align-items: center; justify-content: center; margin: 16px;">
  <paginator-element total-elements="[[totalElements]]" page-elements="[[elementsPerPage]]" selected-page="{{actualPage}}"></paginator-element>
  </div>
  </div>

  
        
        <iron-selector attr-for-selected="stage" selected="{{selectedStage}}" style="display: flex; align-items: center; justify-content: center; flex-wrap: wrap;">
       
       
        <template is="dom-if" if="[[reloadDom]]" restamp>
            <template is="dom-repeat" items="[[getPageItems(stages,actualPage,search,filtroTipo,myStages,_loggedUser,stages.splices)]]">
            <!--<stage-item style="margin: 8px;" file-bytes="[[_getFileBytes(item.data)]]" width="250px"></stage-item>-->
            <stage-item on-click="navigateToStage" style="margin: 8px;" stage="[[item]]" width="250px" no-parse></stage-item>

            </template>
        </template>
        </iron-selector>

        <div style="height: 120px;"></div>
      
    `;
  }
  isOrden(orden,constant){
    return orden==constant;
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
    /*var commentsRef = firebase.database().ref('stages');
    var context=this;
commentsRef.on('child_added', function(data) {
  context.push("stages",data.val());
});*/
FirebaseUtils.queryCollection(this,{
  collection: "stages",
  arrayName: "stages",
  orderBy: "name"
})
  }
  navigateToStage(e){
    var stage=e.model.item;
    NavigationUtils.navigate("stage",{stageId:stage._key});
  }
 
  downloadFile(e){
    var stage=e.model.item;
    this.downloadBinaryFile(stage);
  }
  
   
  getPageItems(stages,page,search,filtroTipo,myStages,_loggedUser){
    if(!stages){
        return;
    }
    //console.log("ITEMS",stages,page,search,filtroTipo);


    var filteredArray=[];
    //this.set("almightElements",stages.length);

      for(var i=0;i<stages.length;i++){
          if(this.actualFilter(stages[i],search,filtroTipo,myStages,_loggedUser)){
              filteredArray.push(stages[i]);
          }
      }
           

    
    this.set("totalElements",filteredArray.length);

      var start=(page-1)*this.elementsPerPage;
      var end=start+this.elementsPerPage;
      var arr=[];
    for(var i=start;i<end;i++){
      var spirit=filteredArray[i];
      if(spirit){
          arr.push(spirit);
      }
    }
    return arr;
}
changeOrden(){
    if(this.direccionOrden=="asc"){

      this.set("direccionOrden","desc");
    }
    else{
      this.set("direccionOrden","asc");
    }
  }
  computeSorter(filtroDropdown,direccionOrden,loggedUser){
    // negocio, persona, fecha, status
    // asc, desc
    var context=this;

    if(filtroDropdown=="name"){
      return function(a,b){
        var nameA=removeDiacritics(a.name.toLowerCase());
        var nameB=removeDiacritics(b.name.  toLowerCase());
        if(direccionOrden=="asc"){
          return nameA.localeCompare(nameB);
        }
        else{
          return nameB.localeCompare(nameA);

        }
      };
    }
   
    else if(filtroDropdown=="maker"){
      return function(a,b){
        
        var makerA=removeDiacritics(a.maker.toLowerCase());
        var makerB=removeDiacritics(b.maker.toLowerCase());

        if(direccionOrden=="asc"){
          return makerA.localeCompare(makerB);
        }
        else{
          return makerB.localeCompare(makerA);

        }
      };
    }

    else if(filtroDropdown=="potenciales"){
      return function(a,b){
        var favA=context.isFavorite(a,loggedUser);
        var favB=context.isFavorite(b,loggedUser);
        

        
        if(favA && favB){
          return 0;
        }
        if(direccionOrden=="asc"){
          return favA ? 1 : -1;
        
        }
        else{
          return favA ? -1 : 1;
        
        }
      };
    }

    else if(filtroDropdown=="upload"){
      return function(a,b){
        
        if(!a._timestamp && b._timestamp){
          if(direccionOrden=="asc"){
            return -1;
          }
          else return 1;
          
        }
        else if(a._timestamp && !b._timestamp){
          if(direccionOrden=="asc"){
            return 1;
          }
          else return -1;
        }
        else if(!a._timestamp && !b._timestamp){
          return 0;
        }

        var timeA=PolymerUtils.convertFirebaseTimestamp(a._timestamp);
        var timeB=PolymerUtils.convertFirebaseTimestamp(b._timestamp);
        if(timeA==timeB){
          return 0;
        }
        else{

          if(direccionOrden=="asc"){
            return timeA>timeB ? 1 : -1;
          }
          else{
            return timeA>timeB ? -1 : 1;
          }
        } 

      };
    }
    
    else if(filtroDropdown=="downloads"){
      return function(a,b){
        
        if(!a.downloads && b.downloads){
          if(direccionOrden=="asc"){
            return -1;
          }
          else return 1;
          
        }
        else if(a.downloads && !b.downloads){
          if(direccionOrden=="asc"){
            return 1;
          }
          else return -1;
        }
        else if(!a.downloads && !b.downloads){
          return 0;
        }

        var timeA=a.downloads;
        var timeB=b.downloads;
        if(timeA==timeB){
          return 0;
        }
        else{

          if(direccionOrden=="asc"){
            return timeA>timeB ? 1 : -1;
          }
          else{
            return timeA>timeB ? -1 : 1;
          }
        } 

      };
    }
    else if(filtroDropdown=="popular"){
      return function(a,b){
       
        var timeA=context.getPercentage(a.likes,a.dislikes);
        var timeB=context.getPercentage(b.likes,b.dislikes);
        if(timeA==timeB){
          return 0;
        }
        else{

          if(direccionOrden=="asc"){
            return timeA>timeB ? 1 : -1;
          }
          else{
            return timeA>timeB ? -1 : 1;
          }
        } 

      };
    }
    
  }
 actualFilter(part,search,filtroTipo,myStages,_loggedUser){
   if(search){
     search=removeDiacritics(search.toLowerCase());
   }
    return part && 
        (
            
            (search ? (((part.name && removeDiacritics(part.name.toLowerCase()).indexOf(search)!=-1)) || 
            ((part.maker && removeDiacritics(part.maker.toLowerCase()).indexOf(search)!=-1)) //||
           /* ((part.negocio && removeDiacritics(part.negocio.toLowerCase()).indexOf(search)!=-1)) ||
        
        ((part.email && removeDiacritics(part.email.toLowerCase()).indexOf(search)!=-1))*/) : true
        )

        && ((filtroTipo && filtroTipo!="all") ? part.size==filtroTipo : true)

        && ((myStages && _loggedUser) ? (part._user && part._user.uid==_loggedUser.uid) : true )

       // && ((usuario && usuario._key!="todos") ? (part.encargado ? usuario._key==part.encargado.uid : false) : true)
        
        
        );
  }
  _ordenChanged(filtroDropdown,direccionOrden){
    if(!this.stages){
      return;
    }
    var sort=this.computeSorter(filtroDropdown,direccionOrden);
    this.stages.sort(sort);
    this.set("reloadDom",false);
    var context=this;
    setTimeout(function(){
      context.set("reloadDom",true);
    },300);
 //   console.log("TTTTT",this.todos);
  }
  static get observers(){
      return[
         
          "_ordenChanged(filtroDropdown,direccionOrden)"

      ];
  }
  static get properties(){
    return{
      myStages:{
        type:Boolean,
        notitfy:true,
        value: false
      },  
      reloadDom:{
        type:Boolean,
        notify:true,
        value: true
      },
      filtroDropdown:{
        type:String,
        notify:true,
        value:"name"
      },
      search:{
        type:String,
        notify:true,
        value: null
      },
      filtroTipo:{
        type:String,
        notify:true,
        value: "all"
      },
      totalElements:{
        type:Number,
        notify:true
      },
      elementsPerPage:{
        type:Number,
        notify:true,
        value: 30
      },
      direccionOrden:{
          type:String,
          notitfy: true,
          value: "asc"
      },
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
