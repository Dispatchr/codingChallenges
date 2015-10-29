'use strict';
//
//
angular.module('checkout', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/checkout', {
    templateUrl: 'public/checkout/checkout.html',
    controller: 'CheckoutCtrl'
  });
}])

.controller('CheckoutCtrl', ['$scope','$resource','CommonProp',function($scope,$resource,CommonProp) {
	$scope.items = CommonProp.getItems();	
	$scope.total = CommonProp.getTotal();

	$scope.submitOrder = function() {
    //
    console.log("got here 10");


    var customersResource = $resource('/api/customers');
  	console.log(customersResource.get());
//NOT FINISHED. LEFT OFF HERE.

	}; 



  }

]);