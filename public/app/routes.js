
angular
  .module("appRoutes", ["ngRoute"]) //import ngroute
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when("/", {
        //when default , directto login
        templateUrl: "app/views/login.html",
        controller: "loginCtrl",
        controllerAs: "login"
      })
      
      .when("/signup", {
        //direct to sign up
        templateUrl: "app/views/signup.html",
        controller: "signCtrl",
        controllerAs: "register"
      })
      .when("/main", {
        templateUrl: "app/views/mainPage.html",
      }) 
      .when("/contact", {
        templateUrl: "app/views/contact.html",
      })
      .when("/about", {
        templateUrl: "app/views/about.html",
      }) 
      .when("/news", {
        //after login direct to news page
        templateUrl: "app/views/showNews.html",
        css: "app/css/news.css"
      }) 
      .otherwise({ redirectTo: "/" }); //other conditions direct to login page

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  });
