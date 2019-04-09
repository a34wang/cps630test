angular.module('userServices',[])  //use instead of $http= 
.factory('User',function($http){
   var  userFactory={};

   userFactory.create = function(regData){
     
    return $http.post('/api/users',regData);
}


return userFactory;
});