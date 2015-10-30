// define angular module/app
angular.module('marketApp', ['ngAnimate','ui.bootstrap','ngRoute'])


angular.module('marketApp').controller('ModalCtrl',function ($scope, $http, $uibModal, $log) {
  
  $http.get('/getUserData').success(function(data) {
    $scope.user = data;
    console.log(data);
    
  });

  $scope.animationsEnabled = true;
  $scope.open_signup = function (size) {
    var modalInstance_signup = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'signup.html',
      controller: 'signupCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.signup;
        }
      }
    });

    modalInstance_signup.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.open_list = function (size) {
    var modalInstance_signup = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'listobject.html',
      controller: 'listCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.list;
        }
      }
    });

    modalInstance_signup.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.open_login = function (size) {

    var modalInstance_login = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'signin.html',
      controller: 'loginCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.login;
        }
      }
    });

    modalInstance_login.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };


  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

});

// Please note that $modalInstance represents a modal window (instance) dependency.
// // It is not the same as the $uibModal service used above.

angular.module('marketApp').controller('loginCtrl',['$scope','$http','$route','$window', '$uibModalInstance','$location',function ($scope,$http,$route, $window, $uibModalInstance,$location) {


  $scope.ok = function () {
    
    $http({
      method  : 'POST',
      url     : '/login',
      data    : $scope.login,  
      headers : { 'Content-Type': 'application/json' }  
    })
    .success(function(data) {
      

      if (data.message) {
        // if not successful, bind errors to error variables
        $scope.errors = data.message[0];
        
      } else {
        // if successful, bind success message to message
         $uibModalInstance.close($scope.login);
        $window.location.reload();
      }
    });
   
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);

angular.module('marketApp').controller('listCtrl',['$scope','$http','$route','$window', '$uibModalInstance','$location',function ($scope,$http,$route,$window, $uibModalInstance,$location) {


  $scope.submit = function () {
    
    if($scope.list){
    $http({
      method  : 'POST',
      url     : '/postObject',
      data    : $scope.list,  
      headers : { 'Content-Type': 'application/json' }  
    })
    .success(function(data) {
      console.log(data);

      if (data.message) {
        // if not successful, bind errors to error variables
        $scope.errors_list = data.message;
        
      } else {
        // if successful, bind success message to message
         $uibModalInstance.dismiss('cancel');
         $window.location.reload();
      }
    });
   }
  };

  $scope.close_list = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);


angular.module('marketApp').controller('signupCtrl',['$scope','$http','$route','$window','$uibModalInstance','$location',function ($scope,$http,$route,$window, $uibModalInstance,$location) {


  $scope.ok_user = function () {
    var sendData = {
      email:$scope.signup_user.email,
      password:$scope.signup_user.password,
      lastname: $scope.signup_user.lastname,
      firstname:$scope.signup_user.firstname,
      admin:false
    }
    console.log($scope.signup_user);
    $http({
      method  : 'POST',
      url     : '/signup',
      data    : sendData,  // pass in data as strings
      headers : { 'Content-Type': 'application/json' }  // set the headers so angular passing info as form data (not request payload)
    })
    .success(function(data) {
      console.log(data)

      if (data.messawge) {
        // if not successful, bind errors to error variables
        
        $scope.errors_user = data.message[0]
      } else {
        // if successful, bind success message to message
        
        $uibModalInstance.close($scope.signup);
       $window.location.reload();
      }
    });
    
  };

  $scope.cancel_user = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.ok_admin = function () {
    var sendData = {
      email:$scope.signup_admin.email,
      password:$scope.signup_admin.password,
      lastname: $scope.signup_admin.lastname,
      firstname:$scope.signup_admin.firstname,
      admin:true
    }
    $http({
      method  : 'POST',
      url     : '/signup',
      data    : sendData,  // pass in data as json
      headers : { 'Content-Type': 'application/json' }  // set the headers so angular passing info as request payload
    })
    .success(function(data) {
      console.log(data)

      if (data.message) {
        // if not successful, bind errors to error variables
        
        $scope.errors_admin = data.message[0]
      } else {
        // if successful, bind success message to message
        
        $uibModalInstance.close($scope.signup);
        $window.location.reload();
      }
    });
    
  };

  $scope.cancel_admin = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);

angular.module('marketApp').controller('list-controller',function ($scope, $http, $uibModal, $log) {
  $http({
        method  : 'GET',
        url     : '/getPosts' // set the headers so angular passing info as request payload
      })
      .success(function(data) {
        console.log(data);

        if (data.message) {
          // if not successful, bind errors to error variables
          
          $scope.errors_admin = data.message[0]
        } else {
          // if successful, bind success message to message
          $scope.list = data;
        }
      });

  $scope.delete =function(item) {
     
     $http({
        method  : 'GET',
        url     : '/delete/'+ item // set the headers so angular passing info as request payload
      })
      .success(function(data) {
        console.log(data);
        if (data.message) {
          // if not successful, bind errors to error variables
          
          $scope.errors_admin = data.message[0]
        } else {
          // if successful, bind success message to message
          $scope.list=data;
        }
      });

  };
  

  

})
