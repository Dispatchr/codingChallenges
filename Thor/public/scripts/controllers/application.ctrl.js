angular.module('OrdersApp').controller('ApplicationCtrl', ['$http','$location','$scope', function($http,$location, $scope) {

	$scope.$on('login', function(_, oResponse) {		
		$scope.admin = oResponse.data.bAdmin; 
		$scope.currentUser = oResponse.data.sUsername;
	});


	$scope.logout = function() {
		$http.delete('/api/user').then(function(oResponse) {
			$scope.admin = null;
			$scope.currentUser = null;
			$location.path('/login');						
		});
	};

}]);

