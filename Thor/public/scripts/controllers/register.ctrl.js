angular.module('OrdersApp').controller('RegisterCtrl', ['$scope','$http','$location', function($scope,$http,$location) {
	
	$scope.register = function() {

		$http.post('/api/user/register', $scope.user).then(function(oResponse) {
			
			if(oResponse.data.bSuccess) {
				$scope.$emit('login', oResponse);
				$location.path('/shop');
			}

		});
	}	

}]);


