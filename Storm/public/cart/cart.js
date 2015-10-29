'use strict';

angular.module('cart', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/cart', {
    templateUrl: 'public/cart/cart.html',
    controller: 'CartCtrl'
  });
}])

.controller('CartCtrl', ['$scope','CommonProp',function($scope,CommonProp) {
    $scope.shopData = [
		{'item':'Hard Disk','id':'HD','selected':0,'prices':[{'size':'200GB','price':'20'},{'size':'400GB','price':'40'}]},
		{'item':'CPU','id':'CPU','selected':0,'prices':[{'size':'i3','price':'200'},{'size':'i5','price':'250'}]},
		{'item':'Monitor','id':'MON','selected':0,'prices':[{'size':'16\'','price':'30'},{'size':'19\'','price':'50'}]},
		{'item':'Optical Mouse','id':'MOU','selected':0,'prices':[{'size':'Optical','price':'3'},{'size':'Advanced','price':'5'}]},
		{'item':'RAM','id':'RM','selected':0,'prices':[{'size':'4GB','price':'40'},{'size':'8GB','price':'80'}]},
		{'item':'USB Keyboard','id':'KEY','selected':0,'prices':[{'size':'Standard','price':'25'},{'size':'Advanced','price':'45'}]}
	];

if(CommonProp.getItems()!=''){
      $scope.shopData = CommonProp.getItems();
    }

$scope.total = function(){
      var t = 0;

      for(var k in $scope.shopData){
        t += parseInt($scope.shopData[k].selected);
      }
      
      CommonProp.setTotal(t);
      return t;

    }

 $scope.$watch('shopData',function(){
      CommonProp.setItems($scope.shopData);
  })


}])
.directive('checkList', function() {
    return {
        restrict: 'E',
	scope: {
            option: '=',
	    name: '=',
	    selected: '=selected'
        },
        template: function(elem, attrs) {
            return '<div class="panel-body">\
                    <div class="radio" ng-repeat="i in option">\
                        <label><input type="radio" ng-model="$parent.selected" ng-value="{{i.price}}"  name="{{name}}">{{i.size}} ${{i.price}}</label>\
                    </div>\
                </div>'
        }
    };
})


.directive('getScroll', function($window) {
  return {
    scope: {
      scroll: '=scroll'
    },
    link: function(scope, element, attrs) {

      var scrollwindow = angular.element($window);
     
      scrollwindow.on('scroll', scope.$apply.bind(scope, function(){scope.scroll = scrollwindow.scrollTop();}));
      
    }
  };
})

.service('CommonProp', function() {
    var Items = '';
    var Total = 0;
 
    return {
        getItems: function() {
            return Items;
        },
        setItems: function(value) {
            Items = value;
        },
        getTotal: function(){
            return Total;
        },
        setTotal: function(value){
            Total = value;
        }
    };
});

