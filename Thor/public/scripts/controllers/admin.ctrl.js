angular.module('OrdersApp').controller('AdminCtrl', ['ShopService','$scope','$http','$location', 
  function(ShopService,$scope,$http,$location) {

  	$scope.items = [];

	ShopService.getItems().then(function(oResponse) {

		$scope.$emit('login', oResponse);

		$scope.items = oResponse.data.aItems;

	});

	$scope.updateItem = function(index) {
		$http.put('/api/admin/item', $scope.items[index]).then(function(oResponse) {
			if(oResponse.data.bSuccess) {
				$scope.items[index] = oResponse.data.updatedItem;
			}
		});
	};

	$scope.addItem = function() {

		$http.post('/api/admin/item', $scope.item).then(function(oResponse) {
			if(oResponse.data.bSuccess) {
				var item = oResponse.data.item;
				$scope.items.unshift(item);								
				$scope.item = null;
			}
		});
	};

}]);

