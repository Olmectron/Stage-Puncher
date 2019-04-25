import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

let internalMixinScreen = function(superClass) {
    return class extends superClass {
      constructor(){
          super();
         
      }

      ready(){
          super.ready();
    
      }
      _getFileBytes(data){
        var d=data.split(",");
        for(var i=0;i<d.length;i++){
          d[i]=Number(d[i]);
        }
        //console.log("DDDD",d);
        return d;
      }
    
      _inputFileChanged(input){
        var inputSelector=this.shadowRoot.querySelector("#file-selector");
        if(inputSelector.files && inputSelector.files[0]){
          
          var file=inputSelector.files[0];
          console.log("Selected a file!",file);
          this._parseFile(file);
        }
        else{
          console.error("No file selected");
        }
        
      }
      _parseFile(file){
        var reader = new FileReader();
        var context=this;
          reader.onload = function(progressEvent){
            var arr=Array.from(new Uint8Array(this.result));
            var string=getHexString(arr);
              context.set("_fileBytes",arr);
              //context.set("fileString",string);
            //console.log("Huffman",getHexString(FireHuffman.decompressArray(FireHuffman.compressArray(arr))));
              //  context.uploadToFirebase(arr,file.name);
        
          };
          reader.readAsArrayBuffer(file);
      }
     
      static get properties(){
          return{
           
          };
      }
    }
  }
  export const FileMixin = dedupingMixin(internalMixinScreen);