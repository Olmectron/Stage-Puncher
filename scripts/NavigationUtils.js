
class NavigationUtilsClass{

    constructor(params){
    this.route= null,
    this._loggedUser= null;
    this._authFired= false;
    this.routeName= null;
    this.page= null;
    this.context=null;
 //   this.pages=["view2", "participantes-view", "usuarios-view","reportes-view"];

    this.userPageListeners=[];
        this.animations={
            /*        "push-up":{entry:"slide-from-bottom-animation",exit:"slide-up-animation"},
                    
                    "push-down":{entry:"slide-from-top-animation",exit:"slide-down-animation"},*/

            "push-left": { entry: "slide-from-right-animation", exit: "slide-left-animation" },

            "push-right": { entry: "slide-from-left-animation", exit: "slide-right-animation" }
        };
    }
    addUserPageListener(navigateTo, user, page, animation) {
        if (page) {
            if (user && this._loggedUser && this._authFired && this.page == page) {
                NavigationUtils.navigateTo(navigateTo, null, NavigationUtils.animations[animation]);
            }
            else if (!user && !this._loggedUser && this._authFired && this.page == page) {
                NavigationUtils.navigateTo(navigateTo, null, NavigationUtils.animations[animation]);
            }
        }
        else {
            if (user && this._loggedUser && this._authFired) {
                NavigationUtils.navigateTo(navigateTo, null, NavigationUtils.animations[animation]);
            }
            else if (!user && !this._loggedUser && this._authFired) {
                NavigationUtils.navigateTo(navigateTo, null, NavigationUtils.animations[animation]);
            }
        }
        this.userPageListeners.push({ "navigateTo": navigateTo, "user": user, "page": page, "animation": animation });

    }

    launchUserPageListeners() {
        for (var i = 0; i < this.userPageListeners.length; i++) {
            var navigateTo = this.userPageListeners[i].navigateTo;
            var user = this.userPageListeners[i].user;
            var page = this.userPageListeners[i].page;
            var animation = this.userPageListeners[i].animation;
            if (page) {
                if (user && this._loggedUser && this._authFired && this.page == page) {
                    NavigationUtils.navigateTo(navigateTo, null, NavigationUtils.animations[animation]);

                }
                else if (!user && !this._loggedUser && this.page == page && this._authFired) {
                    NavigationUtils.navigateTo(navigateTo, null, NavigationUtils.animations[animation]);

                }
            }
            else {
                if (user && this._loggedUser && this._authFired) {
                    NavigationUtils.navigateTo(navigateTo, null, NavigationUtils.animations[animation]);

                }
                else if (!user && !this._loggedUser && this._authFired) {
                    NavigationUtils.navigateTo(navigateTo, null, NavigationUtils.animations[animation]);

                }
            }


        }
    }

    setLoggedUser(user) {
        this._loggedUser = user;
        this.launchUserPageListeners();
    }

    setPage(page) {
        this.page = page;
        this.launchUserPageListeners();
    }

    setRoute(context, route, routeName,routeParams,paramsName) {
        this.context = context;
        this.routeName = routeName;
        this.route = route;
        this.routeParams=routeParams;
        this.paramsName=paramsName;
    }


    navigate(string,params,options){
        if (!this.route) {
            console.error("No route object has been set to NavigationUtils");
        }

        //console.log(this.route);
        if(string.startsWith("/")){
            string=string.substring(1);
          }
          var context = this.context;
          var pName=this.context[this.routeName].path;
          if(pName.startsWith("/")){
          pName=pName.substring(1);
          }
          var origin=pName.split("/")[0];
  
          if (origin) {
            var to = this.pages.indexOf(string);
            var from = this.pages.indexOf(origin);
            // console.log("Indexes",to,from);
            if (to < from) {
                context.set("pageAnimation", { entry: "slide-from-left-animation", exit: "slide-right-animation" });

            }
            else {
                context.set("pageAnimation", { entry: "slide-from-right-animation", exit: "slide-left-animation" });

            }
        }
          if (options) {
            if (options.entry && options.exit) {
                context.set("pageAnimation", { entry: options.entry, exit: options.exit });

            }
            if (options.animation) {
                context.set("pageAnimation", NavigationUtils.animations[options.animation]);
            }
        }

          this.context.set(this.routeName + ".path", string);

          if(params){
            this.context.set(this.paramsName,params);

          }
          else{
            this.context.set(this.paramsName,{});

          }
         
    }

    navigateTo(string, origin, options,params) {
        if (!this.route) {
            console.error("No route object has been set to NavigationUtils");
        }
//        string = encodeURI(string);
        if(string.startsWith("/")){
            string=string.substring(1);
          }
          if(string.startsWith(".")){
              string=this.route.path+"/"+string.substring(1);
          }

         // console.log("THis",this.route.path,string);
          if(this.context[this.routeName].path==string && (this.context[this.paramsName]!={})){
            return;
        }

        var context = this.context;
        if(!origin){
            var pName=this.context[this.routeName].path;
            if(pName.startsWith("/")){
            pName=pName.substring(1);
            }
            origin=pName.split("/")[0];
            
          console.log(origin);
        }
        if (origin) {
            var to = this.pages.indexOf(string);
            var from = this.pages.indexOf(origin);
            // console.log("Indexes",to,from);
            if (to < from) {
                context.set("pageAnimation", { entry: "slide-from-left-animation", exit: "slide-right-animation" });

            }
            else {
                context.set("pageAnimation", { entry: "slide-from-right-animation", exit: "slide-left-animation" });

            }
        }
        if (options) {
            if (options.entry && options.exit) {
                context.set("pageAnimation", { entry: options.entry, exit: options.exit });

            }
            if (options.animation) {
                context.set("pageAnimation", NavigationUtils.animations[options.animation]);
            }
        }

       // console.log(this.route);
       
        this.context.set(this.paramsName,{});
        //console.warn("MIWII",this[this.routeName]);

        if(params){
            this.context.set(this.routeName+".__queryParams",params);
        }
        this.context.set(this.routeName + ".path", encodeURI(string));
        

    }

}
var NavigationUtils=null;
function _initNavigationUtils(context, route, routeName,routeParams,paramsName){
    if(!NavigationUtils){
        NavigationUtils=new NavigationUtilsClass();
        NavigationUtils.setRoute(context,route,routeName,routeParams,paramsName);
        
    }
}
