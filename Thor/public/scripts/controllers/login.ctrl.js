angular.module('OrdersApp').controller('LoginCtrl', ['$scope','$http','$location', function($scope,$http,$location) {

	$scope.login = function(username, password) {

		if(!username || !password) return;

		$http.post('/api/user/login', { 
			username: username,
			password: password 
		}).then(function(oResponse) {
			if(oResponse.data.bSuccess) {
				$scope.$emit('login', oResponse);
				$location.path('/shop');
			}
		});
	}

}]);

