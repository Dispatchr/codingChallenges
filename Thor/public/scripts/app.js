angular.module('OrdersApp', ['ngRoute'])

.service('ShopService',['$http', function($http) {

	this.getItems = function() {
		return $http.get('/api/shop');
	}

}])

.config(function($routeProvider) {

	$routeProvider
	.when('/login', {
		controller: 'LoginCtrl',
		templateUrl: 'templates/login.html'
	})
	.when('/register', {
		controller: 'RegisterCtrl',
		templateUrl: 'templates/register.html'
	})
	.when('/shop', {
		controller: 'ShopCtrl',
		templateUrl: 'templates/shop.html'
	})
	.when('/admin', {
		controller: 'AdminCtrl',
		templateUrl: 'templates/admin.html'
	})
	.otherwise({ redirectTo: '/login' });

});


