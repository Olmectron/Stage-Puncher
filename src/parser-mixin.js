import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

let internalMixinScreen = function(superClass) {
    return class extends superClass {
      constructor(){
          super();
         
      }
      
      ready(){
          super.ready();
         
          
      }
      fullParse(bytes,callback){
        var stage=this.parseData(bytes);
        var parsed=this.parseImage(bytes,function(dataURL){
            stage.dataUrl=dataURL;
            callback(stage);
        });

        

      }
      parseData(bytes){
        return {maker:this._parseMaker(bytes),
        name: this._parseName(bytes)};
      }
      _parseName(bytes){
        var nameArray=bytes.slice(0x10F,0x12E + 0x01);
        var name=getWordFromHex(getHexString(nameArray));
        return name;
        //this.set("stage.name",name);
        
    
      }
      parseImage(bytes,callback){
        if(!bytes){
            console.error("Bytes is wrong");
            return false;
        }
      var string=getHexString(bytes);
      var image=Hex.START_IMAGE+trimBinaryZeroValueBytes(string.substring(string.indexOf(Hex.START_IMAGE)));
     // this.set("imageBase64",_arrayBufferToBase64(stringToByteArray(image)));
      return this.readImage(_arrayBufferToBase64(stringToByteArray(image)),callback);
    }
    readImage(src,callback){
   
          var img = new Image();
          var context=this;
          var c = document.createElement("canvas");
          img.onload = function () {
          var ctx = c.getContext("2d");
          c.width=img.width;
          c.height=img.height;
          ctx.drawImage(img, 0,0);
          var imgData = ctx.getImageData(0, 0, c.width, c.height);
          
          var data=context.contrastImage(imgData,-10);
          ctx.putImageData(data, 0, 0);
          context.set("imageUrl",c.toDataURL());
          if(callback){
//              console.log("cccc","aaa");
            callback(c.toDataURL());
          }
          
          };
          img.src = "data:image/jpg;base64,"+src;
          return true;
     }
     contrastImage(imgData, contrast){  //input range [-100..100]
      var d = imgData.data;
      contrast = (contrast/100) + 1;  //convert to decimal & shift range: [0..2]
      var intercept = 128 * (1 - contrast);
      //console.log("dddaaaaa",d.length);
      for(var i=0;i<d.length;i+=4){   //r,g,b,a
          d[i] = d[i]*contrast + intercept;
          d[i+1] = d[i+1]*contrast + intercept;
          d[i+2] = d[i+2]*contrast + intercept;
      }
      return imgData;
  }
      _parseMaker(bytes){
        var makerArray=bytes.slice(0x25,0x78 + 0x01);
        var maker=getWordFromHex(getHexString(makerArray));
        //this.set("stage.maker",maker);
        return maker;
        
      }
      static get properties(){
          return{
            
          };
      }
    }
  }
  export const ParserMixin = dedupingMixin(internalMixinScreen);