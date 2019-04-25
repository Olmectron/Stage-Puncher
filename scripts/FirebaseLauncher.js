
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA5qZ49ZrKfhPfL4-nHbWRLI7W21Iip8xM",
    authDomain: "smash-stages.firebaseapp.com",
    databaseURL: "https://smash-stages.firebaseio.com",
    projectId: "smash-stages",
    storageBucket: "smash-stages.appspot.com",
    messagingSenderId: "746328248601"
  };
  firebase.initializeApp(config);
    
      try {
        navigator.storage.estimate().then((data) => {
          if ((data.quota - data.usage) > (2 * 1024 * 1024)) {
            
            firebase.firestore().enablePersistence()
            .then(function() {
            
                var db = firebase.firestore();
                
            //console.log("Enabled persistence!");
            })
            .catch(function(err) {
                if (err.code == 'failed-precondition') {
              
              console.log("Failed precondition!");
                    // Multiple tabs open, persistence can only be enabled
                    // in one tab at a a time.
                    // ...
                } 
                else if (err.code == 'unimplemented') {
              
              console.log("Unimplemented!");
                    // The current browser does not support all of the
                    // features required to enable persistence
                    // ...
                }
            });
    
    
          } else {
            // Do not enable offline persistence
          }
        });
      } catch (error) {
        // Error (most probably because the browser does not support storage.estimate() function and therefore is not Chrome)
        // -> Enable offline persistence
      }
            