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
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import './stage-item.js';
import './my-icons.js';
import '@polymer/paper-fab/paper-fab';
import './dialogs/upload-stage-dialog.js';
import '@polymer/iron-icons/iron-icons';
import '@polymer/paper-dialog/paper-dialog';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable';
import '@polymer/neon-animation/neon-animation';
import '@polymer/paper-button/paper-button';
import '@polymer/iron-icon/iron-icon';
import '@polymer/paper-spinner/paper-spinner';
import '@polymer/paper-toast/paper-toast';
import { AuthMixin } from './mixins/auth-mixin.js';

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);

class MyApp extends AuthMixin(PolymerElement) {
  static get template() {
    return html`
      <style>
        :host {
          --app-primary-color: var(--paper-red-600);
          --app-secondary-color: black;

          display: block;
          --paper-dialog-scrollable: {
            max-width: 100% !important;
         
            
          };
          /*--app-drawer-width: 400px;*/
        }

        app-drawer-layout:not([narrow]) [drawer-toggle] {
          display: none;
        }

        app-header {
          color: #fff;
          background-color: var(--app-primary-color);
        }

        app-header paper-icon-button {
          --paper-icon-button-ink-color: white;
        }

        .drawer-list {
          margin: 0 20px;
        }

        .drawer-list a {
          display: flex; align-items: center;
          
          padding: 0 16px;
          text-decoration: none;
          color: var(--app-secondary-color);
          line-height: 40px;
        }

        .drawer-list a iron-icon{
          
        }
        .drawer-list a.iron-selected {
          color: white;
          
          background-color: var(--paper-red-600);
          font-weight: bold;
        }
      </style>

      <app-location route="{{route}}" url-space-regex="^[[rootPath]]" query-params="{{routeParams}}">
      
      </app-location>

      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
      </app-route>

      <app-drawer-layout fullbleed="" narrow="{{narrow}}">
        <!-- Drawer content -->
        <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
        <div style="text-align: center;">
        <img src="../images/logo-big.png" />
        <div style="font-size: 26px; font-weight: 600; color: var(--paper-red-800);">Stage Puncher</div>  
</div>
          <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
            <a name="shared-stages" href="[[rootPath]]shared-stages"><iron-icon style="margin-right: 12px;" icon="icons:folder-shared"></iron-icon>Shared Stages</a>
            <!--<a name="view2" href="[[rootPath]]view2">My Stages</a>-->
            <a name="view3" href="[[rootPath]]view3"><iron-icon style="margin-right: 12px;" icon="icons:info"></iron-icon>About</a>
          </iron-selector>

        <div style="text-align: center">v0.9.2</div>
          </div>
          <!--<stage-item stage="[[selectedStage]]" width="350px" no-parse></stage-item>-->
        </app-drawer>

        <!-- Main content -->
        <app-header-layout has-scrolling-region="">

          <app-header slot="header" condenses="" reveals="" effects="waterfall">
            <app-toolbar>
              <paper-icon-button icon="my-icons:menu" drawer-toggle=""></paper-icon-button>
              <div main-title="">[[getTitle(page)]]</div>
            </app-toolbar>
          </app-header>

          <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
            <my-shared-stages name="shared-stages"></my-shared-stages>
            <my-stage id="stage-view" name="stage" selected-stage="{{stage}}"></my-stage>
            <my-view2 name="view2"></my-view2>
            <my-view3 name="view3"></my-view3>
            <my-view404 name="view404"></my-view404>
          </iron-pages>
        </app-header-layout>
      </app-drawer-layout>

      <div style="position: fixed; bottom: 24px; right: 24px;">
      <template is="dom-if" if="[[isPage(page,'shared-stages')]]">
      <paper-fab icon="cloud-upload" on-click="showUploadDialog"></paper-fab>
        </template>


        <template is="dom-if" if="[[isPage(page,'stage')]]">
        <paper-fab style="background-color: var(--paper-cyan-600);" icon="cloud-download" on-click="downloadFile"></paper-fab>
          </template>
          

      </div>

    `;
  }
/*  _selChanged(stage){
    console.log("ssss",stage);
    this.shadowRoot.querySelector("#drawer").open();
  }*/
  showUploadDialog(){
    PolymerUtils.Dialog.createAndShow({element:"upload-stage-dialog"});
  }
  getTitle(page){
    return this.pagesData[page].name;
  }
  ready(){
    super.ready();
    
    _initNavigationUtils(this,this.route,"route",this.routeParams,"routeParams");
  }
  isPage(page,constant){
    return page==constant;
  }
  constructor(){
    super();
    firebase.auth().signInAnonymously();
  }
  _loggedChanged(user){
    //console.log("User",user);
  }
  downloadFile(){
    var stageView=this.shadowRoot.querySelector("#stage-view");
    if(stageView){
      stageView.downloadFile();
    }
  }
  static get properties() {
    return {
      _loggedUser:{
        observer: "_loggedChanged"
      },
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      pagesData:{
        type:Object,
        notify:true,
        value:{
          "shared-stages":{
            name:"Shared Stages"
          },
          "view2":{
            name:"My Stages"
          },
          "view3":{
            name:"About"
          },
          "stage":{
            name:"Stage"
          }
        }
      },
      selectedStage:{
        type:Object,
        notify:true
      },
      routeData: Object,
      subroute: Object
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }

  _routePageChanged(page) {
     // Show the corresponding page according to the route.
     //
     // If no page was found in the route data, page will be an empty string.
     // Show 'shared-stages' in that case. And if the page doesn't exist, show 'view404'.
    if (!page) {
      this.page = 'shared-stages';
    } else if (['shared-stages', 'stage', 'view3'].indexOf(page) !== -1) {
      this.page = page;
    } else {
      this.page = 'view404';
    }

    // Close a non-persistent drawer when the page & route are changed.
    if (!this.$.drawer.persistent) {
      this.$.drawer.close();
    }
  }

  _pageChanged(page) {
    // Import the page component on demand.
    //
    // Note: `polymer build` doesn't like string concatenation in the import
    // statement, so break it up.
    switch (page) {
      case 'shared-stages':
        import('./my-shared-stages.js');
        break;
      case 'stage':
        import('./my-stage.js');
        break;
      case 'view3':
        import('./my-view3.js');
        break;
      case 'view404':
        import('./my-view404.js');
        break;
    }
  }
}

window.customElements.define('my-app', MyApp);
