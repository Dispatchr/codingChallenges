angular.module('OrdersApp').controller('ShopCtrl', ['ShopService','$scope', '$http','$location','$window','$document',
  function(ShopService,$scope,$http,$location,$window,$document) {

  	var placeOrderButton = $window.document.getElementById('placeOrderButton');
  	var parentNode = placeOrderButton.parentNode;
  	

	ShopService.getItems().then(function(oResponse) {

		$scope.$emit('login', oResponse);

		if(oResponse.data.bSuccess) {
			$scope.items = oResponse.data.aItems.map(function(item) { 
				return Object.defineProperty(item,'quantity', { 
					value: 0, configurable: true, enumerable: true, writable: true 
				}); 
			});
		} else {
			$location.path('/');
		}
	}, function(oError) {
		$location.path('/');
	});

	$scope.plusOne = function(index) {
		$scope.items[index].quantity++;
	}

	$scope.zeroQuantity = function(index) {
		$scope.items[index].quantity = 0;
	}


	$scope.placeOrder = function() {
		var orderItems = $scope.items.filter(function(item) {
			return item.quantity > 0
		});

		if(orderItems.length > 0) {
			$http.post('/api/shop', orderItems).then(function(oResponse) {

				// console.log('placeOrder response:', oResponse);
				// lame, i know
				$window.alert("Order placed");

				orderItems.forEach(function(item) { item.quantity = 0 });
			});
		}
		
	}

	// Executes 500ms after last call of the debounced function.
	var debounced = debounce(function() { 

		// default left/right padding set by bootstrap of 15/15
		var width = parentNode.clientWidth - 30 + 'px';
		if($window.document.body.scrollTop > 80) {
			placeOrderButton.className = placeOrderButton.className.replace('btn-block','sticky');
			placeOrderButton.style.width = width;
		} else {
			placeOrderButton.className = placeOrderButton.className.replace('sticky','btn-block');
			placeOrderButton.style.width = '';
		};

	}, 100); 
	
	angular.element($document).on('scroll', debounced);

}]);




























