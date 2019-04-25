
var DataController={
 
    unregisterQueryBinder: function(options){
        var fieldName=options.name;
        var actual=this[fieldName];
        if(actual){
            actual.getQuery().killQuery();
        }
        this[fieldName]=null;
    },
    registerQueryBinder: function(options){
        //var fieldName=options.name.substring(0,1).toUpperCase()+options.name.substring(1).toLowerCase();
        var fieldName=options.name;
        var context=this;
        if(this[fieldName]){
            this[fieldName].rechargeQuery(options);
          //  console.error("You can't register a QueryBInder twice");
            return;
        }
        
        
            this[fieldName]={
                _query:null,
                _dialogs:{},
                _objectBindings:[],
                bindingExists(context,objectName,doc){
                    var exists=false;
                    PolymerUtils.iterateArray(this._objectBindings,function(binding){
                        if(doc){
                            if(binding.context==context && binding.objectName==objectName && binding.doc==doc){
                               exists=true;
                           // break;
                           }
                       }
                       else{
                           if(binding.context==context && binding.objectName==objectName){
                               exists=true;
                           // break;
                           }
                       }
                    });
                    return exists;
                },
                getBinding(context,objectName,doc){
                    var exists=null;
                    PolymerUtils.iterateArray(this._objectBindings,function(binding){
                        if(doc){
                             if(binding.context==context && binding.objectName==objectName && binding.doc==doc){
                                exists=binding;
                            // break;
                            }
                        }
                        else{
                            if(binding.context==context && binding.objectName==objectName){
                                exists=binding;
                            // break;
                            }
                        }
                    });
                    return exists;
                },
                rechargeQuery: function(opciones){
                    //options.collection=opciones.collection;
                    //options.options=opciones.options;
                    var llaves=Object.keys(opciones);
                    for(var i=0;i<llaves.length;i++){
                        var item=opciones[llaves[i]];
                        options[llaves[i]]=item;
                    }
                    if(context[fieldName]._query){
                        context[fieldName]._query.killQuery();
                        context[fieldName]._query.init({"collection":options.collection,"options":options.options,"onItemAdded":options.onItemAdded,"onItemRemoved":options.onItemRemoved});
                        context[fieldName]._query.reloadQuery();
                 //   context[fieldName]._query.reloadBindings();   
                    }
                    else{
                        context[fieldName]._query=new QueryBinder({"collection":options.collection,"options":options.options,"onItemAdded":options.onItemAdded,"onItemRemoved":options.onItemRemoved});
                     //   console.warn("Exceptional binding");
                        for(var i=0;i<this._objectBindings.length;i++){
                            var bbb=this._objectBindings[i];
                            var binding=this.getBinding(bbb.context,bbb.objectName,bbb.doc);
                                binding.binder.path=options.collection+"/"+bbb.doc;
                              binding.binder.reloadQuery();  
                            //binding.binder.unbindObject(bbb.context,bbb.objectName);
                            //binding.binder.bindObject(bbb.context,bbb.objectName);
                        }
                    }
                    
                },
                getQuery: function(){
                    if(!context[fieldName]._query){
                        if(!options.collection){
                            context[fieldName]._query=new QueryBinder(null);    
                        }
                        else
                        context[fieldName]._query=new QueryBinder({"collection":options.collection,"options":options.options,"onItemAdded":options.onItemAdded,"onItemRemoved":options.onItemRemoved});
                    }
                    return context[fieldName]._query;
                },
                bindObject: function(context,objectName,doc){
                    if(!this.bindingExists(context,objectName,doc)){
                        console.warn("Binding first time",objectName,doc);
                        var binder=new DocumentBinder({"doc":doc,"path":options.collection+"/"+doc,"onItemSet":options.onItemAdded});
                        this._objectBindings.push({"doc":doc,"context":context,"objectName":objectName,"binder":binder});
                        binder.bindObject(context,objectName);
                        return binder;
                    }
                    var binding=this.getBinding(context,objectName,doc);
                    
                    if(binding){
                        console.warn("Binding already existed");
                        binding.binder.unbindObject(context,objectName);
                        binding.binder.bindObject(context,objectName);
                    }
                    return binding;
                },
                unbindObject: function(context,objectName,doc){
                    var binding=this.getBinding(context,objectName,doc);
                    if(binding){
                       // console.log("Unbinding...",objectName,doc);
                        binding.binder.unbindObject(context,objectName);
                    }
                    return binding;
                },
                insert: function(object,options){
                    if(options){

                    
                    var success=options.success;
                    var error=options.error;
                    delete options["success"];
                    delete options["error"];
                    if(typeof(options.includeTimestamp)=="undefined"){
                        options.includeTimestamp=true;
                    }
                    if(typeof(options.includeUser)=="undefined"){
                        options.includeUser=true;
                    }
                    this.getQuery().insert(null,object,success,error,options);
                    }
                    else{
                        this.getQuery().insert(null,object);
                    }
                },
                insertWithAutoIncrement: function(object,options){
                    if(options){

                        
                        var success=options.success;
                        var error=options.error;
                        delete options["success"];
                        delete options["error"];
                        if(typeof(options.includeTimestamp)=="undefined"){
                            options.includeTimestamp=true;
                        }
                        if(typeof(options.includeUser)=="undefined"){
                            options.includeUser=true;
                        }
                        this.getQuery().insertWithAutoIncrement(null,object,success,error,options);
                    }
                    else{
                        this.getQuery().insertWithAutoIncrement(null,object);
                  
                    }
                },
                update: function(object,options){
                    if(options){

                    
                        var success=options.success;
                        var error=options.error;
                        delete options["success"];
                        delete options["error"];
                        if(typeof(options.includeTimestamp)=="undefined"){
                            options.includeTimestamp=true;
                        }
                        if(typeof(options.includeUser)=="undefined"){
                            options.includeUser=true;
                        }

                        this.getQuery().update(null,object,success,error,options);
                    }
                    else{
                        this.getQuery().update(null,object);
                    }
                },

                registerDialog: function(dialogId,dialogOptions){
                    if(dialogOptions["fullElementPath"]){
                       // import("../../"+dialogOptions["fullElementPath"]);
                    }
                    context[fieldName]._dialogs[dialogId]=dialogOptions;
                },

                showDialog: function(dialogId,params){
                    var dialogOptions=context[fieldName]._dialogs[dialogId];
                    if(!dialogOptions){
                        console.error("There's not a dialog registered with the ID: ",dialogId);
                        return;
                    }
                    if(params){
                        dialogOptions.params=params;
                    }
                    PolymerUtils.Dialog.createAndShow(dialogOptions);
                }
            };
        
        
    },
    
};

