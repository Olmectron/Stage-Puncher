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
class MySharedStages extends FirebaseMixin(ParserMixin(PolymerElement)) {
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

      <div style="display: flex; padding: 10px 24px; padding-bottom: 16px; flex-wrap: wrap; align-items: flex-end; background-color: white; position: relative;" class$="[[getClass(collapseOpened)]]"> 
            
      <paper-input value="{{search}}" style="flex-grow: 9; margin-right: 8px;" label="Stage Search"></paper-input>
      
        <!--<div on-click="showCollapse" style="display: flex; align-items: center;position: absolute; bottom: 0; left: 24px; font-size: 13px; font-weight: 500; cursor:pointer; color: var(--paper-indigo-500);">
        
        <template is="dom-if" if="[[collapseOpened]]"><iron-icon icon="icons:arrow-drop-up"></iron-icon></template>
        <template is="dom-if" if="[[!collapseOpened]]"><iron-icon icon="icons:arrow-drop-down"></iron-icon></template>
        
        <span>Más opciones</span></div>-->
        <!--</template>-->
               
      <template is="dom-if" if="[[isOrden(direccionOrden,'asc')]]">
      <paper-icon-button onmouseover="PolymerUtils.Tooltip.show(event,'Orden ascendente. Por ejemplo Z, Y, X, W... A. O las fechas se muestran de la más antigua a la más reciente.')" on-click="changeOrden" class="orden-button" icon="icons:arrow-upward"></paper-icon-button>
    </template>
    
    <template is="dom-if" if="[[isOrden(direccionOrden,'desc')]]">
    <paper-icon-button onmouseover="PolymerUtils.Tooltip.show(event,'Orden descendente. Por ejemplo A, B, C, D... Z. O las fechas se muestran de la más reciente a la más antigua.')" on-click="changeOrden" class="orden-button" icon="icons:arrow-downward"></paper-icon-button>
        </template>

        
      <paper-dropdown-menu label="Ordenar por" style="flex-grow: 2;" attr-for-selected="name">
      <paper-listbox slot="dropdown-content" style="cursor:pointer;" attr-for-selected="name" selected="{{filtroDropdown}}" class="dropdown-content">
        <paper-item name="negocio">Nombre del negocio</paper-item>
        <paper-item name="persona">Nombre de contacto</paper-item>
        <paper-item name="fecha">Fecha de última acción</paper-item>
        <paper-item name="registro">Días desde registro</paper-item>
        <paper-item name="acciones">Número de acciones</paper-item>
        <paper-item name="vendedores">Vendedor</paper-item>
        <paper-item name="potenciales">Clientes potenciales</paper-item>
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
  </div>


        
        <iron-selector attr-for-selected="stage" selected="{{selectedStage}}" style="display: flex; align-items: center; justify-content: center; flex-wrap: wrap;">
        <template is="dom-repeat" items="[[getPageItems(stages,actualPage,search,filtroTipo,todos.splices)]]">
        <!--<stage-item style="margin: 8px;" file-bytes="[[_getFileBytes(item.data)]]" width="250px"></stage-item>-->
        <stage-item on-click="downloadFile" style="margin: 8px;" stage="[[item]]" width="250px" no-parse></stage-item>

        </template>
        </iron-selector>

        <div style="height: 120px;"></div>
      
    `;
  }
  isOrden(orden,constant){
    return orden==constant;
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
  
   
  getPageItems(clientes,page,search,filtroTipo){
    if(!clientes){
        return;
    }


    var filteredArray=[];
    //this.set("almightElements",clientes.length);

      for(var i=0;i<clientes.length;i++){
          if(this.actualFilter(clientes[i],search,filtroTipo)){
              filteredArray.push(clientes[i]);
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

    if(filtroDropdown=="negocio"){
      return function(a,b){
        var negocioA=removeDiacritics(a.negocio.toLowerCase());
        var negocioB=removeDiacritics(b.negocio.toLowerCase());
        if(direccionOrden=="asc"){
          return negocioA.localeCompare(negocioB);
        }
        else{
          return negocioB.localeCompare(negocioA);

        }
      };
    }
   
    else if(filtroDropdown=="persona"){
      return function(a,b){
        
        var negocioA=removeDiacritics(a.displayName.toLowerCase());
        var negocioB=removeDiacritics(b.displayName.toLowerCase());

        if(direccionOrden=="asc"){
          return negocioA.localeCompare(negocioB);
        }
        else{
          return negocioB.localeCompare(negocioA);

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

    else if(filtroDropdown=="fecha"){
      return function(a,b){
        
        if(!a.lastVisit && b.lastVisit){
          if(direccionOrden=="asc"){
            return -1;
          }
          else return 1;
          
        }
        else if(a.lastVisit && !b.lastVisit){
          if(direccionOrden=="asc"){
            return 1;
          }
          else return -1;
        }
        else if(!a.lastVisit && !b.lastVisit){
          return 0;
        }

        var timeA=PolymerUtils.convertFirebaseTimestamp(a.lastVisit.visita);
        var timeB=PolymerUtils.convertFirebaseTimestamp(b.lastVisit.visita);
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
    else if(filtroDropdown=="vendedores"){
      return function(a,b){
        
        if(!a.encargado && b.encargado){
          if(direccionOrden=="asc"){
            return -1;
          }
          else return 1;
          
        }
        else if(a.encargado && !b.encargado){
          if(direccionOrden=="asc"){
            return 1;
          }
          else return -1;
        }
        else if(!a.encargado && !b.encargado){
          return 0;
        }

        var timeA=removeDiacritics(a.encargado.displayName.toLowerCase());
        var timeB=removeDiacritics(b.encargado.displayName.toLowerCase());
        if(timeA==timeB){
          return 0;
        }
        else{

          if(direccionOrden=="asc"){
            return timeA.localeCompare(timeB);
          }
          else{
            return timeB.localeCompare(timeA);
          }
        } 

      };
    }
    else if(filtroDropdown=="registro"){
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
    else if(filtroDropdown=="acciones"){
      return function(a,b){
        
        if(!a.acciones && b.acciones){
          if(direccionOrden=="asc"){
            return -1;
          }
          else return 1;
          
        }
        else if(a.acciones && !b.acciones){
          if(direccionOrden=="asc"){
            return 1;
          }
          else return -1;
        }
        else if(!a.acciones && !b.acciones){
          return 0;
        }

        var timeA=a.acciones;
        var timeB=b.acciones;
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
    else if(filtroDropdown=="status"){
      return function(a,b){


        if(!a.lastVisit && b.lastVisit){
          if(direccionOrden=="asc"){
            return -1;
          }
          else return 1;
          
        }
        else if(a.lastVisit && !b.lastVisit){
          if(direccionOrden=="asc"){
            return 1;
          }
          else return -1;
        }
        else if(!a.lastVisit && !b.lastVisit){
          return 0;
        }

        //console.log("A",a.lastVisit.status);

        var statusA=removeDiacritics(a.lastVisit.status.name.toLowerCase());
        var statusB=removeDiacritics(b.lastVisit.status.name.toLowerCase());
        if(direccionOrden=="asc"){
          return statusA.localeCompare(statusB);
        }
        else{
          return statusB.localeCompare(statusA);

        }

      };
    }
  }
 actualFilter(part,search,filtroTipo){
    return part && 
        (
            
            (search ? (((part.name && removeDiacritics(part.name.toLowerCase()).indexOf(search)!=-1)) || 
            ((part.maker && removeDiacritics(part.maker.toLowerCase()).indexOf(search)!=-1)) //||
           /* ((part.negocio && removeDiacritics(part.negocio.toLowerCase()).indexOf(search)!=-1)) ||
        
        ((part.email && removeDiacritics(part.email.toLowerCase()).indexOf(search)!=-1))*/) : true
        )

        && ((filtroTipo && filtroTipo!="all") ? part.size==filtroTipo : true)

       // && ((usuario && usuario._key!="todos") ? (part.encargado ? usuario._key==part.encargado.uid : false) : true)
        
        
        );
  }
  static get properties(){
    return{
      filtroTipo:{
        type:String,
        notify:true,
        value: "all"
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
