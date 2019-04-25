
firebase.auth().onAuthStateChanged(function(user) {
    //console.log("Firebase user",user);
    if (user) {
        FirebaseUtils.setFirebaseUser(user);

    //    console.log("ffff",user);
    } else {
        FirebaseUtils.setFirebaseUser(null);

   
      // No user is signed in.
    }
   // console.log("Data Helper User",DataHelper.getDataUser());
  });

window.FirebaseUtils={
    //Variable que contiene un objeto vacío, que contendrá el valor del usuario que inicie sesión:
    firebaseUser: null,
    dataUser: null,
    _lastDataUserQuery:null,
    
    standardItemKey: "_key",
    loadFirebaseController:function(dataUser){
        if(dataUser){
            //    DataController.registerQueryBinder({name:"MyStages",collection: "stages",options:{autoQuery: false, specialRef:firebase.firestore().collection("stages").orderBy("name").where("_user.uid","==",dataUser.uid)}});
            
            
        }
        else{
            if(DataController.MyStages){
                DataController.MyStages.getQuery().killQuery();
            }
        }
    },
    Storage:{
        downloadFileBlob: function(options){
            var context=this;
            FirebaseUtils.Storage.getDownloadURL({"path":options.path,"name":options.name,
                "success":function(downloadUrl){
                     //   console.log("DownloadUrl",downloadUrl);
                        fetch(downloadUrl)
                    .then(res => res.blob()) // Gets the response and returns it as a blob
                    .then(blob => {
                        
                       // saveAs(blob,options.name);
                        if(options.success){
                            options.success(blob);
                        }
                    }).catch(function(error){
                        if(options.error){
                            options.error(error);
                        }
                    });
    
                },"error":function(error){
                        console.log("Error while getting download URL",error);
                }});
        },
        downloadFile: function(options){
            var context=this;
            FirebaseUtils.Storage.getDownloadURL({"path":options.path,"name":options.name,
                "success":function(downloadUrl){
                     //   console.log("DownloadUrl",downloadUrl);
                        fetch(downloadUrl)
                    .then(res => res.blob()) // Gets the response and returns it as a blob
                    .then(blob => {
                        
                        saveAs(blob,options.name);
                        if(options.success){
                            options.success(downloadUrl);
                        }
                    }).catch(function(error){
                        if(options.error){
                            options.error(error);
                        }
                    });
    
                },"error":function(error){
                        console.log("Error while getting download URL",error);
                }});
        },
        getDownloadURL:function(options){
            var fileRef = firebase.storage().ref().child(options.path+"/"+options.name);
            var errorCallback=options.error;
            var successCallback=options.success;
            fileRef.getDownloadURL().then(function(url) {
            if(successCallback){
                successCallback(url);
            }
            }).catch(function(error) {
                if(errorCallback){
                    errorCallback(error);
                }
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/object-not-found':
                console.error("No existe el objeto indicado en "+options.path+"/"+options.name);
                break;

                case 'storage/unauthorized':
                console.error("You don't have permission to access this file",error);
                break;

                case 'storage/canceled':
                console.error("Upload was cancelled",error);
                break;


                case 'storage/unknown':
                console.error("An error ocurred while getting the file url",error);

                break;
                default:

                console.error("Error while fetching the file url",error);
                break;
            }
            });
        },
        _actualFirebaseUpload:function(options,file){
            
            var path=options.path;
            var name=options.name;
            var uploadDone=options.success;
            var errorFunction=options.error;
            var onPaused=options.onPaused;
            var onResumed=options.onResumed;
            var progressCallback=options.onProgress;
            
            var storageRef = firebase.storage().ref();
    
            var ref=null;
                            if(name){
            
                            
                ref = storageRef.child(path+"/"+name+"."+file.name.split('.').pop());
                            if(name.split('.').length>1){
                                var extension=name.split(".").pop();
                                
                                ref = storageRef.child(path+"/"+name.replace("."+extension,"")+"."+extension);
                            }
                        }
                        else{
                            ref = storageRef.child(path+"/"+file.name);
                        }
                var task=ref.put(file);/*.then(function(snapshot) {
                   // console.log('Uploaded a blob or file!');
                    snapshot.ref.getDownloadURL().then(function(downloadURL) {
                        if(uploadDone){
                            uploadDone(downloadURL);
                        }
                     //   console.log('File available at', downloadURL);
                      });
                    
                  }).catch(function(err){
                      if(errorFunction){
                          errorFunction();
                      }
            
                  });*/
            
                  task.on('state_changed', function(snapshot){
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if(progressCallback){
                        progressCallback(progress);
                    }
            
                    switch (snapshot.state) {
                      case firebase.storage.TaskState.PAUSED:
                        if(onPaused){
                            onPaused(progress);
                        }
                       // console.log('Upload is paused');
                        break;
                      case firebase.storage.TaskState.RUNNING:
                        if(onResumed){
                            onResumed(progress);
                        }
                     //   console.log('Upload is running');
                        break;
                    }
                  }, function(error) {
                    if(errorFunction){
                        errorFunction(error);
                    }
                  }, function() {
                    task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                        if(uploadDone){
                            uploadDone(downloadURL);
                        }
                    });
                  });
        },
        _actualFirebasePhotoUpload:function(options,file,width,height){
            
            var path=options.path;
            var name=options.name;
            var uploadDone=options.success;
            var errorFunction=options.error;
            var onPaused=options.onPaused;
            var onResumed=options.onResumed;
            var progressCallback=options.onProgress;
            
            var storageRef = firebase.storage().ref();
    


			
			var isImage=file.type.startsWith("image/");
            if(!isImage){
                console.error("The selected file is not an image file, it can't be scaled",file);
                //PolymerUtils.Toast.show("El archivo seleccionado no es una imagen",9000);
                return;
            }
			ImageTools.resize(file, {
                "width": width, // maximum width
                "height": height // maximum height
            }, function(blob, didItResize) {
                        console.log("Did it resize?",didItResize);
                        
                        
            














            var ref=null;
                            if(name){
            
                            
                ref = storageRef.child(path+"/"+name+"."+file.name.split('.').pop());
                            if(name.split('.').length>1){
                                var extension=name.split(".").pop();
                                
                                ref = storageRef.child(path+"/"+name.replace("."+extension,"")+"."+extension);
                            }
                        }
                        else{
                            ref = storageRef.child(path+"/"+file.name);
                        }
                var task=ref.put(blob);
            
                  task.on('state_changed', function(snapshot){
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if(progressCallback){
                        progressCallback(progress);
                    }
            
                    switch (snapshot.state) {
                      case firebase.storage.TaskState.PAUSED:
                        if(onPaused){
                            onPaused(progress);
                        }
                       // console.log('Upload is paused');
                        break;
                      case firebase.storage.TaskState.RUNNING:
                        if(onResumed){
                            onResumed(progress);
                        }
                     //   console.log('Upload is running');
                        break;
                    }
                  }, function(error) {
                    if(errorFunction){
                        errorFunction(error);
                    }
                  }, function() {
                    task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                        if(uploadDone){
                            uploadDone(downloadURL);
                        }
                    });
                  });
                
                
                });
        },
        uploadFile:function(options){

            var type=options.fileTypes;
           


            PolymerUtils.showFileInput(type,function(file){
         FirebaseUtils.Storage._actualFirebaseUpload(options,file);


           });
          },
          uploadImage:function(options){

            var type=options.fileTypes;
           


            PolymerUtils.showFileInput(type,function(file){
         FirebaseUtils.Storage._actualFirebasePhotoUpload(options,file,options.width,options.height);


           });
          }
    },
    
    setStandardKey: function(key){
        this.standardItemKey=key;
    },
    setFirebaseUser: function(user){
        
        if(this._lastDataUserQuery){
            this._lastDataUserQuery();
        }
        
        this.firebaseUser=user;

        if(user){
            var context=this;
            this._lastDataUserQuery=firebase.firestore().collection("users").doc(user.uid)
            .onSnapshot(function(doc) {
                
                    context.setDataUser(context._generateDataUser(doc.data()));
                
            });
        }
        else{
            this.setDataUser(null);
        }


    },
    //Función que retorna el objeto firebaseUser tal cual.
    
    getFirebaseUser: function(){
        return this.firebaseUser;
    },
    //Función que retorna un objeto conteniendo el uid, displayName e email deol objeto firebaseUser:
    _generateDataUser: function(data){
        
        if(!this.firebaseUser){
            return null;
        }
        var user={};
        if(this.firebaseUser.uid){
            user.uid=this.firebaseUser.uid;
        }
        if(this.firebaseUser.displayName){
            user.displayName=this.firebaseUser.displayName;
        }
        if(this.firebaseUser.email){
            user.email=this.firebaseUser.email;
        }
        
        if(data){
            var keys=Object.keys(data);

            for(var i=0;i<keys.length;i++){
                user[keys[i]]=data[keys[i]];
            }
        }
       
        return user;
    },
    setOnce:false,
    setDataUser: function(dataUser){
        var old=this.oldUser ? PolymerUtils.cloneObject(this.oldUser) : null;
        this.dataUser=dataUser;
        this.oldUser=PolymerUtils.cloneObject(dataUser);
        this.setOnce=true;
        PolymerUtils.iterateArray(this.dataUserCallbacks,function(callback){
                
                callback(dataUser);
        });
 //       console.log("Data user",dataUser,old);
        if((dataUser && !old) || ((dataUser && old) && (dataUser.uid!=old.uid || (dataUser.profile && old.profile && dataUser.profile._key!=old.profile._key) || !PolymerUtils.objectEquals(dataUser.accessList,old.accessList)))){
           // console.warn("Reloading data");
            FirebaseUtils.loadFirebaseController(dataUser);

        }

  //      if(dataUser){
//            if(dataUser.profile)
           
/*        }
        else{
            DataController.unregisterQueryBinder({name:"Grupos"});

        }*/
        

        
    },
    getDataUser: function(){
        return this.dataUser;
    },
    getActualUser: function(){
        return this.getUserRef();
    },
    getUserRef: function(){
        var dataUser=this.getDataUser();
        if(!dataUser){
            return null;
        }
        var user={};
        if(dataUser.uid){
            user.uid=dataUser.uid;
        }
        if(dataUser.displayName){
            user.displayName=dataUser.displayName;
        }
        if(dataUser.email){
            user.email=dataUser.email;
        }
        if(dataUser.fingerprintSaved){
            user.fingerprintSaved=dataUser.fingerprintSaved;
        }
        if(user.uid){
            return user;
        }
        return null;
    },
    dataUserCallbacks:[],
    addDataUserCallback: function(callback){
        if(callback){
            var context=this;
            this.dataUserCallbacks.push(callback);
                if(typeof context.getDataUser()!="undefined" && context.setOnce)
                callback(context.getDataUser());
           
        }
        
    },

    auth:{
        saveDataUser: function(firebaseUser,tipoUsuario,secretaryIdProveedor){
            var user={"displayName":firebaseUser.displayName,
            "photoUrl":firebaseUser.photoURL,
            "email":firebaseUser.email,"uid":firebaseUser.uid};
            if(firebaseUser.phoneNumber){
                user.phoneNumber=firebaseUser.phoneNumber;
            }
            user=PolymerUtils.fixDataForFirebase(user,true);
            var userRef=firebase.firestore().collection("users").doc(firebaseUser.uid);
            userRef.set(user, { merge: true })
            .then(function() {

                firebase.firestore().collection("users").doc(firebaseUser.uid).get().then(function(doc){
                    if(!userRef._timestamp){
                        userRef.update({_timestamp:FirebaseUtils.getFirestoreTimestamp()}).then(function(){
                            //console.log("Profile updated successfully",prof);
                        });
    
                    }


                   /* var alreadySaved=doc.data();
                    if(!alreadySaved.profile){
                        var prof=null;
                         var updateBlock={};
                        updateBlock.profile=prof;
                        if(secretaryIdProveedor){
                            updateBlock.secretaryIdProveedor=secretaryIdProveedor;
                        }
                     
                      
                    }*/
                });
              //  console.log("User successfully saved!");
            })
            .catch(function(error) {
                console.error("Error writing user: ", error);
            });
            


        },
      /*  _willSignout: false,
        delayedSignOutCallbacks:[],
        addDelayedSignOutCallback: function(callback){
            if(callback){
                this.delayedSignOutCallbacks.push(callback);
            }
        },
        _signalSignOut: function(willOut){
            this._willSignout=willOut;
            PolymerUtils.iterateArray(this.delayedSignOutCallbacks,function(callback,index){
                if(callback){
                    callback(willOut);
                }
            });
        },
        delayedSignOut: function(ms){
            this._signalSignOut(true);
            var context=this;
            setTimeout(function(){
                firebase.auth().signOut();
                context._signalSignOut(false);
            },ms);
        },*/
        _errorData:{
            "auth/email-already-exists":{
                code:"auth/email-already-exists",
                source: "email",
                toastMessage:"El email ingresado ya está en uso por una cuenta existente",
                toastDuration:9000,
                shortMessage:"Email ya registrado"
            },
            "auth/account-exists-with-different-credential":{
                code: "auth/account-exists-with-different-credential",
                source: "email",
                toastMessage: "Ya existe el email ingresado con otro tipo de login (Email, Facebook, Google, etc.)",
                toastDuration: 9000,
                shortMessage: "Email ya registrado con otra cuenta"
            },
            "auth/user-not-found":{
                code:"auth/user-not-found",
                source: "email",
                toastMessage:"No existe ningún usuario con el email ingresado",
                toastDuration:9000,
                shortMessage:"El usuario no existe"
            },
            "auth/wrong-password":{
                code:"auth/wrong-password",
                source: "password",
                toastMessage:"La contraseña ingresada es incorrecta",
                toastDuration:9000,
                shortMessage:"Contraseña incorrecta"
            },
            "auth/invalid-email":{
                code:"auth/invalid-email",
                source: "email",
                toastMessage:"El email ingresado no tiene un formato válido",
                toastDuration:9000,
                shortMessage:"Email inválido"
            },
            "auth/too-many-requests":{
                code:"auth/too-many-requests",
                source: null,
                toastMessage:"Has intentado iniciar sesión muchas veces. Reinténtalo más tarde",
                toastDuration:9000
            }

        },
        showErrorToast: function(error){
            if(error.errorInfo)
            error=error.errorInfo;

            if(error){

                if(this._errorData[error.code]){
                    var errorDetail=this._errorData[error.code];
                    PolymerUtils.Toast.show(errorDetail.toastMessage,errorDetail.toastDuration);
                    if(errorDetail.source)
                    return {"source":errorDetail.source,"shortMessage":errorDetail.shortMessage};
                    else return null;
                }
                else{
                    PolymerUtils.Toast.show("Error sin capturar: "+error.code+". Detalle: "+error.message,15000);
                }
                return null;
                
            }
        },
        
        
    },

    

/*Inserta un objeto a Firebase, para ser guardado con un ID autogenerado, o a determinado
ID, en caso de ser especificado

    t: contexto del elemento de Polymer desde el que se llama la función

    e: objeto que debe contener los siguientes campos

 * - collection: la colección de Cloud Firestore a la que se agregará el objeto.
 * - includeTimestamp: booleano para definir si se incluirá la estampa de tiempo o no.
 * - includeUser: booleano para definir si se incluirá el usuario actualmente loggeado.
 * - success: función callback llamada en el caso de que la inserción se complete con éxito
 * - error: función callback llamada en el caso de que la inserción falle.
 * - object: el objeto que se agregará a la colección
 * - id: el id del documento en el que se guardará el objeto. Si no se incluye, se llama a la función
 *      'add' de firestore, que le dará un ID autogenerado
 */
update:function(t,e,merge){

    var documento=e.doc;
    var includeTimestamp=(e.includeTimestamp==true);
    var includeUser=(e.includeUser==true);
    var done=e.success;
    if(e.merge!=null){
        merge=e.merge;
    }
    var fail=e.error;
    var insert=e.object;
    if(insert){
        var llaves=Object.keys(insert);
        for(var i=0;i<llaves.length;i++){
            var ll=llaves[i];
            if(ll.startsWith("___")){
                delete insert[ll];
            }
        }
    }
    if(includeTimestamp){
        insert._timestamp=this.getFirestoreTimestamp();
    }
    if(includeUser){
        insert._user=this.getUserRef();
    }
    var db=firebase.firestore();
    
    
        if(documento){
            if(merge==false){

                
                db.doc(documento).update(Object.assign({}, insert)).then(function(){
                    
                    
                    
                    if(done)
                    done();
                    
                }).catch(function(error) {
                    
                    if(fail)
                    fail(error);
                });
                
                
            }
            else{





                db.doc(documento).set(Object.assign({}, insert),{"merge":true}).then(function(){
                    
                    
                    
                    if(done)
                    done();
                    
                }).catch(function(error) {
                    
                    if(fail)
                    fail(error);
                });
            }
        }
                            
       

},
    insert:function(t,e){

        var collection=e.collection;
        var includeTimestamp=(e.includeTimestamp==true);
        var includeUser=(e.includeUser==true);
        var done=e.success;
        var fail=e.error;
        var insert=e.object;
        var objectId=e.id;
        if(!objectId){
            objetId=e._key;
        }
        if(insert){
            var llaves=Object.keys(insert);
            for(var i=0;i<llaves.length;i++){
                var ll=llaves[i];
                if(ll.startsWith("___")){
                    delete insert[ll];
                }
            }
        }
        if(includeTimestamp){
            insert._timestamp=this.getFirestoreTimestamp();
        }
        if(includeUser){
            insert._user=this.getUserRef();
        }
        var db=firebase.firestore();
        
        
            if(objectId){

                db.doc(collection+"/"+objectId).set(Object.assign({}, insert)).then(function(){
                    
                    
                    
                    if(done)
                    done(objectId);
                    
                }).catch(function(error) {
                    
                    if(fail)
                    fail(error);
                });
            
            }
            else{
                db.collection(collection).add(Object.assign({}, insert)).then(function(ref){
                   
                    if(done)
                    done(ref.id);
                    
                }).catch(function(error) {
                    
                    if(fail)
                    fail(error);
                });
            }
                                
           
    
    },
    

    insertManyWithAutoIncrement: function(t,many,e){
        console.log("Inserting many "+many+" with Auto Increment");
        var collection=e.collection;
        var done=e.success;
        var fail=e.error;
        var insert=e.object;
        var counterModifier=e.counterModifier;
        var autoIncrementOnlyFields=(e.onlyFields==true);
        var includeTimestamp=e.includeTimestamp;
        var includeUser=e.includeUser;
        if(includeTimestamp){
            insert._timestamp=this.getFirestoreTimestamp();
        }
        if(includeUser){
            insert._user=this.getUserRef();
        }
        var db=firebase.firestore();
        var start=1;

        var counterRef = firebase.firestore().collection("counters").doc(collection);
        if(counterModifier){
            counterRef=firebase.firestore().collection("counters").doc(collection+"-"+counterModifier);
        }

        return firebase.firestore().runTransaction(function(transaction) {
                    return transaction.get(counterRef).then(function(counterDoc) {
                            if (!counterDoc.exists) {
                                transaction.set(counterRef, { count: many });
                                start=1;
                                //insert[FirebaseUtils.standardItemKey]="1";
                               
                            }
                            else{
                                var newPopulation = counterDoc.data().count + many;
                               
                                transaction.update(counterRef, { count: newPopulation });
                                start=newPopulation-many+1;
                               // insert[FirebaseUtils.standardItemKey]=""+newPopulation;
                                
                            }
                            return start;
                                            
                            });
        }).then(function(inicio) {
            console.log("Success updating population! Start:",inicio);
                  
                   


                       // var key=insert[FirebaseUtils.standardItemKey];
                        //var auxInsert=insert;
                      //  delete insert[FirebaseUtils.standardItemKey];

                        for(var i=0;i<many;i++){
                            var indice=i+inicio;
                            console.log("Indice",indice);
                            var insertClone=PolymerUtils.cloneObject(insert);
                            var llaves=Object.keys(insertClone);
                            for(var j=0;j<llaves.length;j++){
                                var hijo=insertClone[llaves[j]];
                                if((typeof hijo)=="string"){
                                    if(hijo.indexOf("::"+FirebaseUtils.standardItemKey+"::")!=-1){
                                        if(hijo=="::"+FirebaseUtils.standardItemKey+"::"){
                                            insertClone[llaves[j]]=indice;
                                        }
                                        else{
                                            hijo=hijo.replace("::"+FirebaseUtils.standardItemKey+"::",indice+"");
                                          //  console.log("Hijo",hijo);
                                            insertClone[llaves[j]]=hijo;
                                        }
                                        
                                    }
                                }
                            }
                            if(!autoIncrementOnlyFields){
                                db.collection(collection).doc(indice+"").set(Object.assign({}, insertClone)).then(function(){
                           
                                    if(done)
                                    done(indice+"");
                                    
                                }).catch(function(error) {
                                    console.error("Error",error);
                                    if(fail)                            
                                    fail(error);
                                });
                            }
                            else{
                                db.collection(collection).add(Object.assign({}, insertClone)).then(function(ref){
                           
                                    if(done)
                                    done(ref.id);
                                    
                                }).catch(function(error) {
                                    console.error("Error",error);
                                    if(fail)                            
                                    fail(error);
                                });
                            }
                            
                        
                        }
                        //La transacción ocurrió exitosamente.
                        

        }).catch(function(error) {
            console.error("Error",error);
            
               if(fail) 
               fail(error);
        });
    
    },

 /*Inserta un objeto a Firebase, usando un valor autoincrementado como ID 
mediante el uso de transacciones. Recibe dos parámetros:

    t: contexto del elemento de Polymer desde el que se llama la función

    e: objeto que debe contener los siguientes campos

 * - collection: la colección de Cloud Firestore a la que se agregará el objeto.
 * - includeTimestamp: booleano para definir si se incluirá la estampa de tiempo o no.
 * - includeUser: booleano para definir si se incluirá el usuario actualmente loggeado.
 * - success: función callback llamada en el caso de que la inserción se complete con éxito
 * - error: función callback llamada en el caso de que la inserción falle.
 * - object: el objeto que se agregará a la colección
 * 
 */

    insertWithAutoIncrement: function(t,e){
        
        var collection=e.collection;
        var done=e.success;
        var fail=e.error;
        var insert=e.object;
        var includeTimestamp=e.includeTimestamp;
        var includeUser=e.includeUser;
        if(insert){
            var llaves=Object.keys(insert);
            for(var i=0;i<llaves.length;i++){
                var ll=llaves[i];
                if(ll.startsWith("___")){
                    delete insert[ll];
                }
            }
        }
        if(includeTimestamp){
            insert._timestamp=this.getFirestoreTimestamp();
        }
        if(includeUser){
            insert._user=this.getUserRef();
        }
        var db=firebase.firestore();

        var counterRef = firebase.firestore().collection("counters").doc(collection);
        return firebase.firestore().runTransaction(function(transaction) {
                    return transaction.get(counterRef).then(function(counterDoc) {
                            if (!counterDoc.exists) {
                                transaction.set(counterRef, { count: 1 });
                                insert[FirebaseUtils.standardItemKey]="1";
                            }
                            else{
                                var newPopulation = counterDoc.data().count + 1;
                                transaction.update(counterRef, { count: newPopulation });
                                insert[FirebaseUtils.standardItemKey]=""+newPopulation;
                            }
    
                                            
                            });
        }).then(function() {
                  
                    if(insert[FirebaseUtils.standardItemKey]){
                        var key=insert[FirebaseUtils.standardItemKey];
                        //var auxInsert=insert;
                        delete insert[FirebaseUtils.standardItemKey];
                        //La transacción ocurrió exitosamente.
                        db.collection(collection).doc(key).set(Object.assign({}, insert)).then(function(){
                           
                            if(done)
                            done(key);
                            
                        }).catch(function(error) {
                            
                            if(fail)                            
                            fail(error);
                        });
                    }
                    else{
                        
                    }
                                
                                
        }).catch(function(error) {
            
               if(fail) 
               fail(error);
        });
    
    },
    queryExactCollection: function(t,e){
    
        var arr=e.array;
        var arrName=e.arrayName;
        var collection=e.collection;
        var orderBy=e.orderBy;
        var order=e.order;
        var done=e.done;
        var where=e.where;
        var includeDeleted=(e.includeDeleted==true);
        var specialRef=e.specialRef;
        var db=firebase.firestore();
        var collectionReference=db.collection(collection);
        if(!specialRef){
        if(orderBy){
          if(order){
            if(where){
                if(where[1]=="!="){
                    collectionReference=db.collection(collection).where(where[0],"<",where[2]).where(where[0],">",where[2]).orderBy(orderBy,order);
              
                }
                else
                collectionReference=db.collection(collection).where(where[0],where[1],where[2]).orderBy(orderBy,order);
            }
            else
            collectionReference=db.collection(collection).orderBy(orderBy,order);
            
          }
          else{
            if(where){
                if(where[1]=="!="){
                    collectionReference=db.collection(collection).where(where[0],"<",where[2]).where(where[0],">",where[2]).orderBy(orderBy);
                }
                else
                collectionReference=db.collection(collection).where(where[0],where[1],where[2]).orderBy(orderBy);
            }
            else
            collectionReference=db.collection(collection).orderBy(orderBy);
            
          }
        }
    }
    else{
        collectionReference=specialRef;
    }
            var snapshotReference=collectionReference.onSnapshot(function(querySnapshot) {
               // t.splice(arrName,0,arr.length);
                querySnapshot.forEach(function(doc) {
                    var nuevo=doc.data();
                    
                    nuevo[FirebaseUtils.standardItemKey]=doc.id;
//                    console.log(nuevo);
                    var add=true;
                    for(var i=0;i<arr.length;i++){
                        var o=arr[i];
                        if(!o){
                            continue;
                        }
                        if(nuevo[FirebaseUtils.standardItemKey]==o[FirebaseUtils.standardItemKey]){
                            
                            add=false;
                            if(!nuevo._deleted || includeDeleted)
                            t.splice(arrName,i,1,nuevo);
                            else
                            t.splice(arrName,i,1);
                        }
                    }
                    if(add){
                        if(!nuevo._deleted || includeDeleted){
                            console.log("Adding a value",nuevo);
                            t.push(arrName,nuevo);
        
                        }
                        
                    }
                                if(done)
                                done();
                    
                    
                });
            });
            return snapshotReference;
      },
    /* 
    Esta función consulta y mantiene sincronizada (unidireccionalmente, de firebase -> cliente),
    la lista de documentos dentro de la colección indicada.

    Recibe dos parámetros:

    t: el contexto del elemento de Polymer (this) desde el que es llamada la función.
    
    e: objeto que debe contener los siguientes elementos
        -array: el arreglo de javascript que almacenará los datos conseguidos de Firebase
        -arrayName: el nombre de la propiedad de firebase que contiene al definido en 'array'
        -collection: el nombre de la colección de firebase que se consultará
        -orderBy: (opcional) el nombre deol campo por el que se desea ordenar la consulta.
        -order: "asc" o "desc" para recuperar los datos de forma ascendente o descendente
        -done: callback llamado cuando todos los datos dentro de la colección han sido recuperados
        -where: arreglo de javascript que debe contener en 0 el lado izquierdo del comparativo (el nombre del campo),
                en 1, el operador del comparativo y en 2, el valor contra el que se compara. 
    */
    findIndexArrayWithKey: function(array,value,key){
        if(!array){
            return -1;
        }
        for(var i=0;i<array.length;i++){
            var hijo=array[i];
            if(hijo[key]==value){
             //   console.log("Key",i);
             //   console.log(hijo,value);
                return i;
            }
        }
        return -1;
    },
    queryCollection: function(t,e){
        var contextoHelper=this;
        var arr=e.array;
        var arrName=e.arrayName;
        var collection=e.collection;
        var orderBy=e.orderBy;
        var order=e.order;
        var done=e.callback;
        var where=e.where;
        var errorCallback=e.error;
        var includeDeleted=(e.includeDeleted==true);
        var specialRef=e.specialRef;
        var db=firebase.firestore();
        var filter=e.filter;
        var collectionReference=null;
        if(collection)
        collectionReference=db.collection(collection);
        if(!specialRef){
        if(orderBy){
          if(order){
            if(where){
                if(where[1]=="!="){
                    collectionReference=db.collection(collection).where(where[0],"<",where[2]).where(where[0],">",where[2]).orderBy(orderBy,order);
              
                }
                else
                collectionReference=db.collection(collection).where(where[0],where[1],where[2]).orderBy(orderBy,order);
            }
            else
            collectionReference=db.collection(collection).orderBy(orderBy,order);
            
          }
          else{
            if(where){
                if(where[1]=="!="){
                    collectionReference=db.collection(collection).where(where[0],"<",where[2]).where(where[0],">",where[2]).orderBy(orderBy);
                }
                else
                collectionReference=db.collection(collection).where(where[0],where[1],where[2]).orderBy(orderBy);
            }
            else
            collectionReference=db.collection(collection).orderBy(orderBy);
            
          }
        }
    }
    else{
        collectionReference=specialRef;
    }
    var arre=[];
    if(arrName){

    
        if(t.set)
        t.set(arrName,arre);
        else
        t.splice(arrName,0,arr.length);
    }
    var snapshotReference=collectionReference.onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
            if (change.type === "added") {
                var nuevo=change.doc.data();
                nuevo[FirebaseUtils.standardItemKey]=change.doc.id;
                 if(!nuevo._deleted || includeDeleted){
                     if(filter){
                        if(filter(nuevo)){
                            if(arrName)
                            t.push(arrName,nuevo);
                            else arre.push(nuevo);
 
                        }
                     }
                     else{
                        if(arrName)
                        t.push(arrName,nuevo);
                        else arre.push(nuevo);
 
                     }
                 }
            }
            if (change.type === "modified") {
                var i=FirebaseUtils.findIndexArrayWithKey(t[arrName],change.doc.id,FirebaseUtils.standardItemKey);
                var nuevo=change.doc.data();
                nuevo[FirebaseUtils.standardItemKey]=change.doc.id;
             //   console.log("Collection "+collection+" was modified",i,nuevo);
                if(!nuevo._deleted || includeDeleted){
                    if(i!=null && i>-1){

                        if(filter){
                            if(filter(nuevo)){
                                if(arrName)
                        t.splice(arrName,i,1,nuevo);
                        else arre.splice(i,1,nuevo);
                            }else{
                                if(arrName)
                                t.splice(arrName,i,1);
                                else arre.splice(i,1);
                            }
                         }
                         else{
                            if(arrName)
                        t.splice(arrName,i,1,nuevo);
                        else arre.splice(i,1,nuevo);
                         }
               //         console.log("Splicing existing data",nuevo);
                    }
                    
                }
                else{
                 //   console.log("Deleting because of flag data");
                    if(i!=null && i>-1){
                        if(arrName)
                    t.splice(arrName,i,1);
                    else arre.splice(i,1);
                    }
                }

                
            }
            if (change.type === "removed") {
                var i=FirebaseUtils.findIndexArrayWithKey(t[arrName],change.doc.id,FirebaseUtils.standardItemKey);
                
                //console.log("Deleting data completely");
                if(i!=null && i>-1){
                    if(arrName)
                t.splice(arrName,i,1);
                else arre.splice(i,1);
                }
            }
        });
        if(done){
            if(arrName){
                done(t[arrName]);
            }
            else{

                done(arre);
            }
        }
    },function(error) {
        console.error("Error querying collection: ", error);
        if(errorCallback){
            errorCallback(error);
        }
    });
            /*var snapshotReference=collectionReference.onSnapshot(function(querySnapshot) {
                //t.splice(arrName,0,arr.length);
                querySnapshot.forEach(function(doc) {
                    var nuevo=doc.data();
                    
                    nuevo[FirebaseUtils.standardItemKey]=doc.id;
//                    console.log(nuevo);
                    var add=true;
                    for(var i=0;i<arr.length;i++){
                        var o=arr[i];
                        if(!o){
                            continue;
                        }
                        if(nuevo[FirebaseUtils.standardItemKey]==o[FirebaseUtils.standardItemKey]){
                            
                            add=false;
                            if(!nuevo._deleted || includeDeleted){
                                t.splice(arrName,i,1,nuevo);
                                console.log("Splicing existing data",nuevo);
                            }
                            else{
                                console.log("Deleting data");
                                t.splice(arrName,i,1);
                            }
                            
                        }
                    }
                    if(add){
                        if(!nuevo._deleted || includeDeleted){
        
                            t.push(arrName,nuevo);
        
                        }
                        
                    }



                                if(done)
                                done();
                    
                    
                });
                for(var i=arr.length-1;i>=0;i--){
                    var antiguo=arr[i];
                    var borrar=true;
                    querySnapshot.forEach(function(doc) {

                        if(antiguo[FirebaseUtils.standardItemKey]==doc.id){
                            borrar=false; 
                        }

                    });
                    if(borrar)
                    t.splice(arrName,i,1);  
                }
            });*/
            return snapshotReference;
      },
    queryCollectionOnce: function(t,e){
        var contextoHelper=this;
        var arr=e.array;
        var arrName=e.arrayName;
        var collection=e.collection;
        var orderBy=e.orderBy;
        var order=e.order;
        var done=e.callback;
        var where=e.where;
        var errorCallback=e.error;
        var includeDeleted=(e.includeDeleted==true);
        var specialRef=e.specialRef;
        var db=firebase.firestore();
        var filter=e.filter;
        var collectionReference=null;
        if(collection)
        collectionReference=db.collection(collection);
        if(!specialRef){
        if(orderBy){
          if(order){
            if(where){
                if(where[1]=="!="){
                    collectionReference=db.collection(collection).where(where[0],"<",where[2]).where(where[0],">",where[2]).orderBy(orderBy,order);
              
                }
                else
                collectionReference=db.collection(collection).where(where[0],where[1],where[2]).orderBy(orderBy,order);
            }
            else
            collectionReference=db.collection(collection).orderBy(orderBy,order);
            
          }
          else{
            if(where){
                if(where[1]=="!="){
                    collectionReference=db.collection(collection).where(where[0],"<",where[2]).where(where[0],">",where[2]).orderBy(orderBy);
                }
                else
                collectionReference=db.collection(collection).where(where[0],where[1],where[2]).orderBy(orderBy);
            }
            else
            collectionReference=db.collection(collection).orderBy(orderBy);
            
          }
        }
    }
    else{
        collectionReference=specialRef;
    }
    var arre=[];
    if(arrName){

    
        if(t.set)
        t.set(arrName,arre);
        else
        t.splice(arrName,0,arr.length);
    }
    var snapshotReference=collectionReference.get().then(function(snapshot) {
        snapshot.forEach(function(documento) {
            
            var nuevo=documento.data();
                nuevo[FirebaseUtils.standardItemKey]=documento.id;
                 if(!nuevo._deleted || includeDeleted){
                     if(filter){
                        if(filter(nuevo)){
                            if(arrName)
                            t.push(arrName,nuevo);
                            else arre.push(nuevo);
 
                        }
                     }
                     else{
                        if(arrName)
                        t.push(arrName,nuevo);
                        else arre.push(nuevo);
 
                     }
                 }
            
            
        });
        if(done){
            if(arrName){
                done(t[arrName]);
            }
            else{

                done(arre);
            }
        }
    }).catch(function(error) {
        console.error("Error querying collection: ", error);
        if(errorCallback){
            errorCallback(error);
        }
    });
            /*var snapshotReference=collectionReference.onSnapshot(function(querySnapshot) {
                //t.splice(arrName,0,arr.length);
                querySnapshot.forEach(function(doc) {
                    var nuevo=doc.data();
                    
                    nuevo[FirebaseUtils.standardItemKey]=doc.id;
//                    console.log(nuevo);
                    var add=true;
                    for(var i=0;i<arr.length;i++){
                        var o=arr[i];
                        if(!o){
                            continue;
                        }
                        if(nuevo[FirebaseUtils.standardItemKey]==o[FirebaseUtils.standardItemKey]){
                            
                            add=false;
                            if(!nuevo._deleted || includeDeleted){
                                t.splice(arrName,i,1,nuevo);
                                console.log("Splicing existing data",nuevo);
                            }
                            else{
                                console.log("Deleting data");
                                t.splice(arrName,i,1);
                            }
                            
                        }
                    }
                    if(add){
                        if(!nuevo._deleted || includeDeleted){
        
                            t.push(arrName,nuevo);
        
                        }
                        
                    }



                                if(done)
                                done();
                    
                    
                });
                for(var i=arr.length-1;i>=0;i--){
                    var antiguo=arr[i];
                    var borrar=true;
                    querySnapshot.forEach(function(doc) {

                        if(antiguo[FirebaseUtils.standardItemKey]==doc.id){
                            borrar=false; 
                        }

                    });
                    if(borrar)
                    t.splice(arrName,i,1);  
                }
            });*/
            return snapshotReference;
      },
      /**
       * queryDocument recibe dos variables:
       * 
       * - context: el contexto de Polymer del documento.
       * - e: puede contener los siguientes parámetros:
       *    collection: la colección de la que se va a consultar el documento.
       *    doc: el ID del documento.
       *    observer: el callback que se llamará cada vez que el objeto cambie.
       * 
       */
      queryDocument(context,e){
        var collection=e.collection;
        var docId=e.doc;
        if(collection){
            docId=collection+"/"+docId;
        }
        var objectCallback=e.observer;
        if(!docId){
            return null;
        }

            var snapshotReference=firebase.firestore().doc(docId)
            .onSnapshot(function(doc) {
                var nuevo=doc.data();
                    if(nuevo)
                    nuevo[FirebaseUtils.standardItemKey]=doc.id;
                    
                    if(objectCallback){
                        objectCallback(nuevo);
                    }
            });
            return snapshotReference;
      },
      killQuery:function(snapshotReference){
        snapshotReference();
        console.log("Killed query");
      },
      pseudoDeleteDocument:function(context,e){
        var collection=e.collection;
        var docId=e.doc;
        var success=e.success;
        var error=e.error;

        firebase.firestore().collection(collection).doc(docId).update({"_deleted":true}).then(function() {
            if(success){
                success();
            }
        }).catch(function(errorObject) {
            if(error){
                error(errorObject);
            }
        });
      },
      deleteDocument:function(context,e){
        var collection=e.collection;
        var docId=e.doc;
        var success=e.success;
        var error=e.error;

        firebase.firestore().collection(collection).doc(docId).delete().then(function() {
            if(success){
                success();
            }
        }).catch(function(errorObject) {
            if(error){
                error(errorObject);
            }
        });
      },
      getFirestoreTimestamp: function(){
          return firebase.firestore.FieldValue.serverTimestamp();
      }
      


    };
     

















function getActualUser(){
    return FirebaseUtils.getUserRef();
}

