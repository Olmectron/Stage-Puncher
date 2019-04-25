import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

let internalMixinAuth = function(superClass) {
    return class extends superClass {
      constructor() {
        super();
        var context=this;
        FirebaseUtils.addDataUserCallback(function(loggedUser){
          
            
            if(loggedUser){
                context.set("_loggedUser",loggedUser);
            }
            else{

                context.set("_loggedUser",null);
            }
            context.set("_loadedUser",true);

        });
        
      }
      _loggedUserHasPath(path,o1,o2){

        var user=this._loggedUser;
        if(o1 && o2){
          if(o1!=o2){
            return false;
          }
        }

        return (user && user.accessList && user.accessList[path]);
      }
      _getHideStyleWhenExists(value){
        if(value){
          return "display: none;";
        }
        else{
          return "";
        }
      }
      static get properties() {
        return {
          _loggedUser:{
              type:Object,
              notify:true,
              value: null
          },
          _loadedUser:{
            type:Boolean,
            notify:true,
            value: false
          }
        };
      }
  
      static get observers() {
        return [ 

        ];
      }
      signOut(){
        firebase.auth().signOut().then(function() {
          // Sign-out successful.
        }).catch(function(error) {
          // An error happened.
        });
      }
      _updateUserFields(obj,callback){
        if(!this._loggedUser){
          console.error("There's not a logged user right now");
          return;
        }
        firebase.firestore().doc("users/"+this._loggedUser.uid).set(obj,{merge:true}).then(function(){
          if(callback){
            callback();
          }

        }).catch(function(err){
          console.error("Error saving user data",obj,err);
        });
      }
    
      signupPassword(data,successCallback){
        
      var dialog=PolymerUtils.Dialog.createAndShow(
        {type: "modal",
        saveSpinner:{
          message: "Registrando Usuario",
          saving: true
       },
       
       style:"width: 400px; height: 300px;",
       smallStyle: "width: 95% !important;"
        }
        );
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password).then(
          function(result){
           // console.log("Created a new account");
            var user = result.user;
            user.updateProfile({
              displayName: data.displayName
              //phoneNumber: data.phone
            }).then(function() {

              //user.displayName=data.displayName;
              //user.phoneNumber=data.phone;
              var redUser={displayName: data.displayName,email:user.email,
              uid:user.uid,phoneNumber: data.phone};

              FirebaseUtils.auth.saveDataUser(redUser);
              dialog.close();
              if(successCallback){
                successCallback();
              }
  
              // Update successful.
            }).catch(function(error) {
              console.error("Error updating profile",error,data);
              // An error happened.
            });
          }
        ).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          FirebaseUtils.auth.showErrorToast(error);
          // ...
        });
      }
      
      loginPassword(data,successCallback,errorCallback){
        
        var dialog=PolymerUtils.Dialog.createAndShow(
          {type: "modal",
          saveSpinner:{
            message: "Iniciando Sesión",
            saving: true
         },
         
         style:"width: 400px; height: 300px;",
         smallStyle: "width: 95% !important;"
          }
          );
          firebase.auth().signInWithEmailAndPassword(data.email, data.password).then(
            function(result){
             // console.log("Created a new account");
              var user = result.user;
              dialog.close();
              
            FirebaseUtils.auth.saveDataUser(user);
              if(successCallback){
                successCallback();
              }
           
            }
          ).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            
            var returnError=FirebaseUtils.auth.showErrorToast(error);
            dialog.close();
            if(errorCallback){
              errorCallback(returnError);
            }
            // ...
          });
        }
      loginFacebook(){
        var provider = new firebase.auth.FacebookAuthProvider();
        provider.setCustomParameters({
          'display': 'popup'
          });
          firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            FirebaseUtils.auth.saveDataUser(user);
            //console.log("Success signin with Google",result);
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.error("Error login with Facebook",error);
            FirebaseUtils.auth.showErrorToast(error);
            // ...
          });
      }
      loginGoogle(){
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({
          'display': 'popup'
          });
        firebase.auth().signInWithPopup(provider).then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          FirebaseUtils.auth.saveDataUser(user);
          //console.log("Success signin with Google",result);
          // ...
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          console.error("Error login with Google",error);
          FirebaseUtils.auth.showErrorToast(error);
          // ...
        });
      }
  
    }
  }
  export const AuthMixin = dedupingMixin(internalMixinAuth);