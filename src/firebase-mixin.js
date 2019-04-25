import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';


let internalMixinScreen = function(superClass) {
    return class extends superClass {
      constructor(){
          super();
         
      }
      
      ready(){
          super.ready();
         
          
      }
      _processDownloadedBlob(blob,stage){
        var arrayBuffer;
        var fileReader = new FileReader();
        fileReader.onload = function(event) {
            arrayBuffer = event.target.result;
            var finalDownload=FireHuffman.decompressArray(arrayBuffer,true);
            var dataBlob=new Blob([new Uint8Array(finalDownload)]);
            var dataFile = new File([dataBlob], stage.binaryName,{type:"binary"});
            
            saveAs(dataBlob,stage.binaryName);
         // //console.warn("FINAL DOWNLOAD",finalDownload);
        };
        fileReader.readAsArrayBuffer(blob);
      }
      downloadBinaryFile(stage){
          if(!stage.binaryName){
              //console.error("Stage doesn't have a binary name");
            return;
          }
          var context=this;
          FirebaseUtils.Storage.downloadFileBlob({path:"stages/"+stage._key,name:stage.binaryName,
        success: function(blob){
            ////console.log("Success getting blob",blob);
            context._processDownloadedBlob(blob,stage);

        },error:function(err){

                //console.error("Error getting blob",err);
        }});
    


      }
      uploadToFirebase(arr,fileName,successCallback,errorCallback){
        this.fullParse(arr,function(stage){
          //console.warn("Full parsed",stage);
          var blob=dataURItoBlob(stage.dataUrl);
          var file = new File([blob], "stage.jpg",{type:"image/jpeg"});
    
          var dataBlob=new Blob([new Uint8Array(FireHuffman.compressArray(arr))]);
          var dataFile = new File([dataBlob], fileName,{type:"binary"});
          
          delete stage["dataUrl"];
          stage._timestamp=firebase.firestore.FieldValue.serverTimestamp();
          var newStageKey = firebase.database().ref().child('stages').push().key;
    
          firebase.database().ref('stages/' + newStageKey).set({
            data: arr.toString(),
            _timestamp: firebase.database.ServerValue.TIMESTAMP
          }).then(function(){
            firebase.firestore().collection("stages").doc(newStageKey).set(
             stage
            ).then(function(){
    
    
    
              FirebaseUtils.Storage._actualFirebaseUpload({
                path:"stages/"+newStageKey,
                success:function(binaryUrl){
                  //console.log("Success uploading binary file",binaryUrl);
    
             
    
    
                                  FirebaseUtils.Storage._actualFirebasePhotoUpload({
                                    path:"stages/"+newStageKey,
                                    name:"stage.jpg",
                                    success:function(downloadUrl){
                                      //console.log("Success uploading stage photo",downloadUrl);
    
                                      firebase.firestore().collection("stages").doc(newStageKey).update({imageUrl:downloadUrl,binaryName:fileName}).then(function(){
                                        //console.log("Success updating download and binary URLs");

                                        if(successCallback){
                                          successCallback();
                                        }

                                      }).catch(function(err){
                                        //console.error("Error updating downlad URL",err);
                                        if(errorCallback){
                                          errorCallback(err);
                                        }
                                      });
                                    },
                                    error:function(err){
                                      //console.error("Error uploading photo",err);
                                      if(errorCallback){
                                        errorCallback(err);
                                      }
                                    }
                                  },file,400,400);
    
    
            },
            error:function(err){
              //console.error("Error uploading photo",err);
              if(errorCallback){
                errorCallback(err);
              }
            }
          },dataFile);
    
    
    
    
    
              //console.log("success uploading stage!!");
            }).catch(function(err){
              if(errorCallback){
                errorCallback(err);
              }
            });
      
          }).catch(function(err){
            if(errorCallback){
              errorCallback(err);
            }
          });
    
    
          
        });
    
    
      
        
      }
      
      static get properties(){
          return{
            
          };
      }
    }
  }
  export const FirebaseMixin = dedupingMixin(internalMixinScreen);