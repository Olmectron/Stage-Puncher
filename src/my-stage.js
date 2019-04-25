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
import { NavigationMixin } from './mixins/navigation-mixin.1.js';
import './stage-info.js';
import { ScreenMixin } from './mixins/screen-mixin.js';
import { FirebaseMixin } from './firebase-mixin.js';
import { ParserMixin } from './parser-mixin.js';
import { AuthMixin } from './mixins/auth-mixin.js';
import { Polymer } from '@polymer/polymer/polymer-legacy';

class MyStage extends AuthMixin(ParserMixin(FirebaseMixin(ScreenMixin(NavigationMixin(PolymerElement))))) {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
        .card-shadow{
          box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
          transition: all 0.3s cubic-bezier(.25,.8,.25,1);
        }
        .card-shadow:hover{
          
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
        }
        .tag{
          margin: 12px;
          border-radius: 5px;
          color: white;
          font-weight: 500;
          padding: 6px 12px;
          cursor:pointer;
          position: relative;
          user-select: none;
        }
        .tag iron-icon{
          margin-right: 12px;
        }
        .title[small-screen]{
          font-size: 35px;
          line-height: 40px;
          
        }
        .title{
          font-weight: 600;
          font-size: 75px;
          font-weight: 600;
          font-family: 'Roboto', sans-serif;
          line-height: 68px;
          padding-bottom: 8px;
          font-variant: small-caps;
/*                animation: pulse .6s infinite ease-out, flash .05s linear 1;*/

/*                text-shadow: black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px, black 0 0 5px;*/
            text-shadow: white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px, white 0 0 5px;

            
          color: var(--paper-grey-900);
      }
      </style>
       <div style="display: flex; align-items: center; justify-content: center;">
        <div style="text-align: center;">
          <img src="[[stage.imageUrl]]" class="card-shadow" style="border-radius: 15px; width: 500px; max-width: 95%; height: auto;" />
          <div class="carta">

           <div style="position: absolute; top: 0; left: 0;  border-radius: 5px 0px 5px 0px; color: white; padding: 1px 6px;  background-color: var(--paper-grey-900);">
            [[stage.maker]]
            </div>
            
            <!--<div class="stage-name" style="color: white; font-weight: 600; position: absolute; bottom: 4px; right: 0px; left: 0px; text-align: center">
              [[stage.name]]
            </div>-->

            <div style="padding: 4px 12px; color: var(--paper-grey-800); text-align: center;">
              <div class="title" small-screen$="[[_smallScreen]]">[[stage.name]]</div>
              <div style="font-size: 25px; color: var(--paper-blue-900); font-weight: 500;">By [[stage.maker]]</div>
              <div style="font-size: 18px; font-weight: 500;">[[_processDate(stage.createTimestamp)]]</div>
              <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: center; padding-top: 12px;">
              
              <div class="tag" on-click="downloadFile" style="font-size: 14px; color: var(--paper-cyan-600); border: 2px solid var(--paper-cyan-600);  font-weight: 500;"> <paper-ripple></paper-ripple>
              <iron-icon icon="file-download"></iron-icon>[[getNumber(stage.downloads)]]</div>
              <div class="tag" on-click="sumLike" style="font-size: 14px; color: var(--paper-green-600); border: 2px solid var(--paper-green-600); font-weight: 500;"> <paper-ripple></paper-ripple>
              <iron-icon icon="thumb-up"></iron-icon>[[getNumber(stage.likes)]]</div>
              <div class="tag" on-click="sumDislike" style="font-size: 14px; color: var(--paper-red-600); border: 2px solid var(--paper-red-600); font-weight: 500;"> <paper-ripple></paper-ripple>
              <iron-icon icon="thumb-down"></iron-icon>[[getNumber(stage.dislikes)]]</div>


              </div>
              <div>
              <template is="dom-if" if="[[isMyStage(stage,_loggedUser)]]">
                <paper-button on-click="askDelete" style="font-weight: 500; color: var(--paper-red-900);"><iron-icon style="font-size: 15px; font-weight: 500; color: var(--paper-red-700);  margin-right: 8px;" icon="delete-forever"></iron-icon>Delete</paper-button>
              </template>
              </div>   


            </div>


            </div>
        </div>
      </div>
    `;
  }
  isMyStage(stage,user){
    return stage && user && stage._user && stage._user.uid==user.uid;      
  }
  _processDate(date){
    if(!date){
      return null;
    }
    var fecha=date.split(",")[0];
    var hora=date.split(",")[1];
    var fechaSplit=fecha.split("-");
    return this._monthsNames[fechaSplit[1]-1]+" "+fechaSplit[2]+", "+fechaSplit[0]+" "+hora;

  }
  _paramsChanged(params){
 //   console.log("Params",params);
    
    if(params && params.stageId){
      var context=this;
      if(this.lastStageQuery){
        this.lastStageQuery();
      }
      this.set("lastStageQuery",FirebaseUtils.queryDocument(this,{
        doc:"stages/"+params.stageId,
        observer: function(stage){
//          console.log("sss",stage);
          context.set("stage",stage);
        }
      }));
    }
    

  }
  _stageChanged(stage){
    //console.warn("STT",stage);
  }
  downloadFile(){
//    var stage=e.model.item;

 
    

    var timestamp=PolymerUtils.convertFirebaseTimestamp(this._loggedUser._lastDownload);
    if(!timestamp || isNaN(timestamp)){
      timestamp=0;
    }
    var now=new Date().getTime();
    var resta=Math.floor((now-timestamp)/1000);
    //console.warn("RESA",resta,timestamp,now);
    if(resta>60){
      if(this.downloading){
        PolymerUtils.Toast.show("A file is already being downloaded");
        return;
      }    
      this.set("downloading",true);
      var context=this;
      setTimeout(function(){
        context.set("downloading",false);
      },8000);


      console.log("Downloading");
   
      var stage=this.stage;
      this.downloadBinaryFile(stage);
      this._updateUserFields({"_lastDownload":FirebaseUtils.getFirestoreTimestamp()});
      this.sumDownloadCounter();

      


       }
    else{
      PolymerUtils.Toast.show("Wait "+(60-resta)+" more seconds before another download");
    }
  }
  sumDislike(){
    var userId = this._loggedUser.uid;
    //console.log("User ref",FirebaseUtils.getUserRef());
    var context=this;
    if(context.changingLike){
      PolymerUtils.Toast.show("Wait while your like is set");
      return;
    }
    
  
    
    var stage=this.stage;
    //console.log("Summing dislike");
    return firebase.database().ref('stages/' + stage._key+"/"+userId).once('value').then(function(snapshot) {
      var val=snapshot.val();
      if(val){
          if(val=="dislike"){
            PolymerUtils.Toast.show("You already disliked this");
          }
          else if(val=="like"){
            if(context.changingLike){
              PolymerUtils.Toast.show("Wait while your like is set");
              return;
            }
            context.set("changingLike",true);
            setTimeout(function(){
              context.set("changingLike",false);
            },7000);

            


            var db=firebase.firestore();
        var ref = db.collection("stages").doc(stage._key);
        
        db.runTransaction(function(transaction) {
            return transaction.get(ref).then(function(doc) {
                if (!doc.exists) {
                  transaction.set(ref, { likes: 0 });
                  return 0;
                }
        
                var newDownloads = doc.data().likes - 1;
                if(!newDownloads || isNaN(newDownloads) || newDownloads<0){
                  newDownloads=0;
                }
               
                transaction.update(ref, { likes: newDownloads });
                    return newDownloads;
               
            });
        }).then(function(newPopulation) {
        
              db.runTransaction(function(transaction) {
                  return transaction.get(ref).then(function(doc) {
                      if (!doc.exists) {
                        transaction.set(ref, { dislikes: 1 });
                        return 1;
                      }
              
                      var newDownloads = doc.data().dislikes + 1;
                      if(!newDownloads || isNaN(newDownloads)){
                        newDownloads=1;
                      }
                    
                      transaction.update(ref, { dislikes: newDownloads });
                          return newDownloads;
                    
                  });
              }).then(function(newPopulation) {
                firebase.database().ref('stages/' + stage._key+"/"+userId).set("dislike");
              //   console.log("Downloads increased to ", newPopulation);
              }).catch(function(err) {
                  // This will be an "population is too big" error.
                  console.error("Error increasing dislikes",err);
              });
         //   console.log("Downloads increased to ", newPopulation);
        }).catch(function(err) {
            // This will be an "population is too big" error.
            console.error("Error decreasing likes",err);
        });
          }
      }
      else{
        var db=firebase.firestore();
        var ref = db.collection("stages").doc(stage._key);
        if(context.changingLike){
          PolymerUtils.Toast.show("Wait while your like is set");
          return;
        }

        context.set("changingLike",true);
        setTimeout(function(){
          context.set("changingLike",false);
        },7000);

        db.runTransaction(function(transaction) {
            return transaction.get(ref).then(function(doc) {
                if (!doc.exists) {
                  transaction.set(ref, { dislikes: 1 });
                  return 1;
                }
        
                var newDownloads = doc.data().dislikes + 1;
                if(!newDownloads || isNaN(newDownloads)){
                  newDownloads=1;
                }
               
                transaction.update(ref, { dislikes: newDownloads });
                    return newDownloads;
               
            });
        }).then(function(newPopulation) {
          firebase.database().ref('stages/' + stage._key+"/"+userId).set("dislike");
         //   console.log("Downloads increased to ", newPopulation);
        }).catch(function(err) {
            // This will be an "population is too big" error.
            console.error("Error increasing dislikes",err);
        });
      }

      // ...
    });
  }
  sumLike(){
    var userId = this._loggedUser.uid;
    //console.log("User ref",FirebaseUtils.getUserRef());
    var context=this;
    if(context.changingLike){
      PolymerUtils.Toast.show("Wait while your like is set");
      return;
    }
    
    

    var stage=this.stage;
    return firebase.database().ref('stages/' + stage._key+"/"+userId).once('value').then(function(snapshot) {
      var val=snapshot.val();
      if(val){
          if(val=="like"){
            PolymerUtils.Toast.show("You already liked this");
          }
          else if(val=="dislike"){
            var db=firebase.firestore();
        var ref = db.collection("stages").doc(stage._key);

        if(context.changingLike){
          PolymerUtils.Toast.show("Wait while your like is set");
          return;
        }


        context.set("changingLike",true);
        setTimeout(function(){
          context.set("changingLike",false);
        },7000);


        db.runTransaction(function(transaction) {
            return transaction.get(ref).then(function(doc) {
                if (!doc.exists) {
                  transaction.set(ref, { dislikes: 0 });
                  return 0;
                }
        
                var newDownloads = doc.data().dislikes - 1;
                if(!newDownloads || isNaN(newDownloads) || newDownloads<0){
                  newDownloads=0;
                }
               
                transaction.update(ref, { dislikes: newDownloads });
                    return newDownloads;
               
            });
        }).then(function(newPopulation) {
        
              db.runTransaction(function(transaction) {
                  return transaction.get(ref).then(function(doc) {
                      if (!doc.exists) {
                        transaction.set(ref, { likes: 1 });
                        return 1;
                      }
              
                      var newDownloads = doc.data().likes + 1;
                      if(!newDownloads || isNaN(newDownloads)){
                        newDownloads=1;
                      }
                    
                      transaction.update(ref, { likes: newDownloads });
                          return newDownloads;
                    
                  });
              }).then(function(newPopulation) {
                firebase.database().ref('stages/' + stage._key+"/"+userId).set("like");
              //   console.log("Downloads increased to ", newPopulation);
              }).catch(function(err) {
                  // This will be an "population is too big" error.
                  console.error("Error increasing likes",err);
              });
         //   console.log("Downloads increased to ", newPopulation);
        }).catch(function(err) {
            // This will be an "population is too big" error.
            console.error("Error decreasing dislikes",err);
        });
          }
      }
      else{
        var db=firebase.firestore();
        var ref = db.collection("stages").doc(stage._key);

        if(context.changingLike){
          PolymerUtils.Toast.show("Wait while your like is set");
          return;
        }

        context.set("changingLike",true);
    setTimeout(function(){
      context.set("changingLike",false);
    },7000);


        db.runTransaction(function(transaction) {
            return transaction.get(ref).then(function(doc) {
                if (!doc.exists) {
                  transaction.set(ref, { likes: 1 });
                  return 1;
                }
        
                var newDownloads = doc.data().likes + 1;
                if(!newDownloads || isNaN(newDownloads)){
                  newDownloads=1;
                }
               
                transaction.update(ref, { likes: newDownloads });
                    return newDownloads;
               
            });
        }).then(function(newPopulation) {
          firebase.database().ref('stages/' + stage._key+"/"+userId).set("like");
         //   console.log("Downloads increased to ", newPopulation);
        }).catch(function(err) {
            // This will be an "population is too big" error.
            console.error("Error increasing likes",err);
        });
      }

      // ...
    });
  }
  
  sumDownloadCounter(){
    if(!this.stage){
      return;
    }

    var db=firebase.firestore();
    var ref = db.collection("stages").doc(this.stage._key);
    db.runTransaction(function(transaction) {
        return transaction.get(ref).then(function(doc) {
            if (!doc.exists) {
              transaction.set(ref, { downloads: 1 });
              return 1;
            }
    
            var newDownloads = doc.data().downloads + 1;
            if(!newDownloads || isNaN(newDownloads)){
              newDownloads=1;
            }
           
            transaction.update(ref, { downloads: newDownloads });
                return newDownloads;
           
        });
    }).then(function(newPopulation) {
     //   console.log("Downloads increased to ", newPopulation);
    }).catch(function(err) {
        // This will be an "population is too big" error.
        console.error("Error increasing downloads",err);
    });
  }
  getNumber(number){
    if(!number){
      return 0;
    }
    return number;
  }
  askDelete(){
    var stage=this.stage;
    PolymerUtils.Dialog.createAndShow({
      title:{
        text:"Delete Stage",
        style:"color: white; background-color: var(--paper-red-500);"
      },
      message:{
        text:"Are you sure about deleting the stage <b>"+stage.name+"</b>? <span style='color: var(--paper-red-500);'>It will be deleted from the server and you'll lost it if you didn't make a backup.</span>"
      },
      style:"width: 280px; max-width: 95%;",
      saveSpinner:{
        message:"Eliminando..."
      },
      positiveButton:{
        text:"Delete",
        style:"border-radius: 5px; color: white; background-color: var(--paper-red-600);",
        action: function(dialog){
            dialog.setSaving(true);
            firebase.firestore().collection("stages").doc(stage._key).delete().then(function(){
              dialog.close();
              PolymerUtils.Toast.show("Success deleting stage!");
              NavigationUtils.navigate("shared-stages");
            }).catch(function(err){
              console.error("Error deleting stage",err);
              dialog.setSaving(false);
              PolymerUtils.Toast.show("Error deleting stage. Try again later"); 

            });
        }
      },
      negativeButton:{
        text:"Cancel"
      }
    });
  }
  static get properties(){
      return{
        _routeParams:{
          observer: "_paramsChanged"
        },
        _monthsNames:{
          type:Array,
          notify:true,
          value:["January","February","March","April","May","June","July","August","September","October","November","December"]
        },
        _pageName:{
          value: "stage"
        },
        stage:{
          type:Object,
          notify:true,
          observer: "_stageChanged",
          reflectToAttribute: true
        }
      };
  }
}

window.customElements.define('my-stage', MyStage);
