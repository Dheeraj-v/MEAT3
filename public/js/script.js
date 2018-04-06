var app = angular.module('App', ['ngRoute']);

app.config(function($routeProvider) {
  
  $routeProvider
    .when('/', {
      templateUrl : 'home.ejs',
      controller : 'homeCtrl'
    })
    
    // saved
    .when('/chicken', {
      templateUrl : 'chicken.ejs',
      controller : 'chickenCtrl'
    })
        // saved
    .when('/mutton', {
      templateUrl : 'mutton.ejs',
      controller : 'chickenCtrl'
    })
        // saved
    .when('/fish', {
      templateUrl : 'fish.ejs',
      controller : 'chickenCtrl'
    })
    //home
    .when('/home', {
      templateUrl : 'home.ejs',
      controller : 'homeCtrl'
    })
    .when('/cart', {
      templateUrl : 'cart.ejs',
      controller : 'homeCtrl'
    })
    .when('/orderplacement', {
      templateUrl : 'orderplacement.ejs',
      controller : 'orderPlacement'
    }) 
     .when('/admin', {
      templateUrl : 'adminboard.ejs',
      controller : 'adminboardCtrl'
    }) 
    .when('/:itemName', {
      templateUrl : 'product.ejs',
      controller : 'productCtrl'
    })            
});

