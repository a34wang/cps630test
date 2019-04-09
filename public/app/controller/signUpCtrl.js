angular.module('signinControllers',['userServices']) //calling services
.controller('signCtrl', function($http,$location,$timeout,User){
    var app = this;

 this.regUser=function(regData){
    app.errorMsg=false;   //reset pop up warning and sucees mesage
    app.successMsg=false;
    User.create(app.regData).then(function(data){   //create a function to 
       console.log(data);
      if(data.data.success){           //if data return success , direct to login page
          app.successMsg = data.data.message+"...redirecting to login page";
          
          $timeout(function(){
             $location.path('/');  //wait 2500ms then direct

          },2500)
      }
      else{      //show errror
           app.errorMsg = data.data.message;
      }

    });
 };


});