angular
  .module("loginController", ["authServices"])
  .controller("loginCtrl", function(Auth, $window, $location, $timeout) {
    var app = this;
    //$window.localStorage.setItem('loggedIn', JSON.stringify(false));
    app.isLoggedIn = () => {
      if (JSON.parse($window.localStorage.getItem('loggedIn')) === null) {
        return false;
      }
      return JSON.parse($window.localStorage.getItem('loggedIn'));
    }
    this.logOut = function() {
      $window.localStorage.clear();
    }
    
    this.getUser = () => {
      return JSON.parse($window.localStorage.getItem('user')).username;
    }
    this.doLogin = function(loginData) {
      app.errorMsg = false;
      app.successMsg = false;
      Auth.login(app.loginData).then(function(data) {
        console.log(data);
        if (data.data.success) {
          app.successMsg = data.data.message + "...redirecting to main page";
          $window.localStorage.setItem('loggedIn', JSON.stringify(true));

          $window.localStorage.setItem('user', JSON.stringify(data.data.user));
          console.log($window.localStorage.getItem('user'));
          $timeout(function() {
            $location.path("/main");
          }, 2500);
        } else {
          app.errorMsg = data.data.message;
        }
      });
    };
  });
