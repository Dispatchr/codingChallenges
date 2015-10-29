/**
 * Created by Tejas on 10/24/2015.
 */

var customersApp = angular.module('customersApp',['ngRoute']);

// use the config method to set up Angular routes (not server routes for http.get or http.post):
customersApp.config(function ($routeProvider) {
  $routeProvider
    .when('/',{
        templateUrl: 'partials/customers_view.html'
    })
    .when('/orders',{
        templateUrl: 'partials/orders_view.html'
    })
    .when('/products',{
        templateUrl: 'partials/products_view.html'
    })
     .when('/products/:id',{
        templateUrl: 'partials/products_view.html'
    })
    .when('/dashboard',{
        templateUrl: 'partials/dashboard_view.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});   