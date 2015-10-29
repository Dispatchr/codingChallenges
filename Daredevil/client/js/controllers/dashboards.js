/**
 * Created by Tejas on 10/24/2015.
 */
// DASHBOARD CONTROLLER

customersApp.controller('dashboardController',function($scope,customerFactory,orderFactory,productFactory){  

	$scope.customers = [];
	$scope.products = [];
	$scope.orders = [];

	customerFactory.getCustomers(function(data){
		$scope.customers = data;
	})

	productFactory.getProducts(function(data){
		$scope.products = data;
	})

	orderFactory.getOrders(function(data){
		$scope.orders = data;
	})
})