var loginApp = angular.module('loginApp',["firebase"]);

loginApp.controller("mainController", function($scope, $firebaseAuth){
   
    var ref = new Firebase("https://login-authentication-16.firebaseio.com");
     var authObj = $firebaseAuth(ref);
    
     authObj.$onAuth(function(authData) {
         $scope.authData = authData;
         if (authData) {
             console.log("Logged in as:", authData.uid);
             
         } else {
             console.log("Logged out");
        }
     });
    
    $scope.login = function (){
      
        
        authObj.$authWithPassword({
                email: "kenara19@gmail.com",
                password: "testpass"
            }).then(function(authData) {
        console.log("Logged in as:", authData.uid);
            }).catch(function(error) {
                console.error("Authentication failed:", error);
            });
           /* authObj.$authWithOAuthPopup("github").then(function(authData) {
                console.log("Logged in as:", authData.uid);
                console.log(authData);
                
            }).catch(function(error) {
            console.error("Authentication failed:", error);
            });*/
      

  };
    
 $scope.logout = function (){
       authObj.$unauth();
     
 };
  
       $scope.createLogin = function (){
                ref.createUser({
                  email    : "bobtony@firebase.com",
               password : "correcthorsebatterystaple"
             }, function(error, userData) {
               if (error) {
                 console.log("Error creating user:", error);
               } else {
                 console.log("Successfully created user account with uid:", userData.uid);
               }
              });
       };
});