var custApp = angular.module('custApp', []);

custApp.controller('custCtrl', function($scope, $http){
	console.log("into the custCtrl");

	custShowAllInv();

	//toggle two tables
	$scope.showCartTab = true;
	$scope.showInvTab = false;

	$scope.seeCartTab = function(){
		$scope.showCartTab = true;
		$scope.showInvTab = false;
	}

	$scope.seeInvTab = function(){
		$scope.showCartTab = false;
		$scope.showInvTab = true;
	}
	
	//-------------------------------login and sign up part------------------------
	//detect if is a guest login
	$scope.isGuest = true;

	//ajax for login
	$scope.custLogin = function(username){
		var loginJsonData = {CustomerUsername: username};
		$http.post('/custLogin', loginJsonData)
			.success(function(res){
				if(res != "FAIL"){
					$scope.isGuest = false;
					$scope.CustomerUsername = res.CustomerUsername;
					$scope.Address = res.Address;
					$scope.Phone = res.Phone;
					$scope.Email = res.Email;

					custShowAll($scope.CustomerUsername);
				}
		});
	};

	//ajax for sigup
	$scope.custSignup = function(custSignUser, custSignAddrs, custSignPhone, custSignEml){
		var NewCustomerInfo = {};
		NewCustomerInfo.CustomerUsername = custSignUser;
		NewCustomerInfo.Address = custSignAddrs;
		NewCustomerInfo.Phone = custSignPhone;
		NewCustomerInfo.Email = custSignEml;

		$http.post('/addNewCustomer', NewCustomerInfo);

		var NewCustomerOrderData = {};
		NewCustomerOrderData.CustomerUsername = custSignUser;
		NewCustomerOrderData.Orders = [];

		$http.post('/addNewCustomerOrder', NewCustomerOrderData)
			.success(function(){
				$http.post('/custLogin', {CustomerUsername: custSignUser})
					.success(function(res){
						if(res != "FAIL"){
							$scope.isGuest = false;
							$scope.CustomerUsername = res.CustomerUsername;
							$scope.Address = res.Address;
							$scope.Phone = res.Phone;
							$scope.Email = res.Email;

							custShowAll($scope.CustomerUsername);
						}
				});
			});
	};

	//------------------------------customer buy new product-----------------------

	$scope.custAddNewOrder = function(product, amount, rate, CustomerUsername){
		var order = {};
		order.OrderName = product;
		order.Amount = amount;
		order.Rate = parseInt(rate);
		order.Key = CustomerUsername + product + amount + rate;

		var ExCustomerData = {};
		ExCustomerData.CustomerUsername = CustomerUsername;
		ExCustomerData.NewOrder = order;

		$http.post('/AddNewOrder', ExCustomerData)
			.success(function(data){
				if(data == "FAIL") alert("Please enter an existing customer");
				else{
					//clear amount input
					//$scope.custBuyAmount = "";
					custShowAll(CustomerUsername);
				} 
			});
	};

	//------------------------------initialization function-------------------------

	function custShowAll(username){
		$http.post('/custShowAll', {CustomerUsername: username})
			.success(function(res){
				$scope.items = res;
			});
	}

	function custShowAllInv(){
		$http.get('/showInventory')
			.success(function(inventory){
				console.log(inventory);
				$scope.inventory = inventory;
			});
	}
});