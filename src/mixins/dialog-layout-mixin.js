import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';


let ddd = function(superClass) {
    return class extends superClass {
        constructor(field){
            super();
           
        }
        static get properties(){
            return{
                _dialog:{
                    type:Object,
                    notify:true
                },
                _dialogField:{
                    type:String,
                    notify:true,
                    observer: "_dialogFieldCompletelyChanged"
                }
            };
        }
        _dialogFieldCompletelyChanged(value){
            if(value){
                this.set("_field",value);
                //       console.log("Setting field",field);
                       this.set(value,{});
            }

        }
        DialogLayout_reloadTitle() {
            if (this._dialog) {
              this._dialog.reloadTitle();
            }
          }
      
          DialogLayout_updateTitle(title) {
            if (this._dialog) {
              this._dialog.updateTitle(title);
            }
          }
      
        DialogLayout_closeDialog(){
            if(this._dialog){
                this._dialog.close();
            }
        }
        DialogLayout_notifyResize(){
            if(this._dialog){
                this._dialog.notifyResize();
            }
        }
        DialogLayout_clearFields(){
           
            if(this._dialog){
//                console.warn("entré",this._field);
                if(this._field){
                    this.set(this._field,{});
 /*                   console.log(this[this._field]);
                    var llaves=Object.keys(this[this._field]);
                    for(var i=0;i<llaves.length;i++){
                        console.error("Cleaning",llaves[i],this._field);
                        this.set(this._field+"."+llaves[i],null);

                    }*/
                }
            }
        }
        DialogLayout_setSaving(saving){
            //console.log("Saving");
            if(this._dialog){
               // console.log("Saving true",saving);
                this._dialog.setSaving(saving);
            }
        }

        DialogLayout_clickNegativeButton(){
            if(this._dialog){
                var pButton=this._dialog.querySelector(".negativeButtonClassForLayout");
                //console.log();
                if(pButton){
                    pButton.click();
                    //console.log("Clicked!");
                }
                else{
                    console.warn("There's no negative button in your custom element");
                }
                //this._dialog.close();
            }
        }
        
        DialogLayout_clickPositiveButton(){
            if(this._dialog){
                var pButton=this._dialog.querySelector(".positiveButtonClassForLayout");
                //console.log();
                if(pButton){
                    pButton.click();
                    //console.log("Clicked!");
                }
                else{
                    console.warn("There's no positive button in your custom element");
                }
                //this._dialog.close();
            }
        }
  
    }
  }
  export const DialogLayoutMixin = dedupingMixin(ddd);