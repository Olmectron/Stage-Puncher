import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

let internalMixinAuth = function(superClass) {
    return class extends superClass {
      constructor() {
        super();
        var context=this;
        DataHelper.addDataUserCallback(function(loggedUser){
          //  console.log("Logged user",loggedUser);
        //  console.error("LOOOOOOOOOOG",loggedUser);
            
            if(loggedUser){
                context.set("_loggedUser",loggedUser);
            }
            else{

                context.set("_loggedUser",null);
            }
            context.set("_loadedUser",true);

        });
        //this.addEventListener('keypress', (e) => this._handlePress(e));
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
        firebase.firestore().doc("users/"+this._loggedUser.uid).update(obj).then(function(){
          if(callback){
            callback();
          }

        }).catch(function(err){
          console.error("Hubo un error guardando los datos del usuario",obj,err);
        });
      }
      _userIsProveedor(){
        //Proveedor
        return this._loggedUser && this._loggedUser.profile && this._loggedUser.profile.id=="1";
      }
      _userIsCliente(){
        //Usuario
        return this._loggedUser && this._loggedUser.profile && this._loggedUser.profile.id=="2";

      }
      _userIsSecretaria(){
        //Secretaria
        return this._loggedUser && this._loggedUser.profile && this._loggedUser.profile.id=="4";

      }
      _userIsAdministrador(){
        //Admin
        return this._loggedUser && this._loggedUser.profile && this._loggedUser.profile.id=="3";

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

              DataHelper.auth.saveDataUser(redUser);
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
          DataHelper.auth.showErrorToast(error);
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
              
            DataHelper.auth.saveDataUser(user);
              if(successCallback){
                successCallback();
              }
              /*user.updateProfile({
                displayName: data.displayName
                //phoneNumber: data.phone
              }).then(function() {
  
                //user.displayName=data.displayName;
                //user.phoneNumber=data.phone;
                var redUser={displayName: data.displayName,email:user.email,
                uid:user.uid,phoneNumber: data.phone};
  
                DataHelper.auth.saveDataUser(redUser,data.isProveedor);
                dialog.close();
                if(successCallback){
                  successCallback();
                }
    
                // Update successful.
              }).catch(function(error) {
                console.error("Error updating profile",error,data);
                // An error happened.
              });*/
            }
          ).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            
            var returnError=DataHelper.auth.showErrorToast(error);
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
            DataHelper.auth.saveDataUser(user);
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
            DataHelper.auth.showErrorToast(error);
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
          DataHelper.auth.saveDataUser(user);
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
          DataHelper.auth.showErrorToast(error);
          // ...
        });
      }
  
    }
  }
  export const AuthMixin = dedupingMixin(internalMixinAuth);