/**
 * Created by Tejas on 10/24/2015.
 */

customersApp.controller('ordersController',function($scope,orderFactory,customerFactory,productFactory){ 

    $scope.orders = [];
    $scope.customers = [];
    $scope.products = [];

    // get all orders
    orderFactory.getOrders(function(data){
        $scope.orders = data;
    })

    // get all customers
    customerFactory.getCustomers(function(data){
        $scope.customers = data;
    })

    // get all products
    productFactory.getProducts(function(data){
        $scope.products = data;
    })

    $scope.addOrder = function(newOrder){                                 
        orderFactory.addOrder(newOrder, function(data){
            // display new date to users
            console.log('new order added in client controller',data);
            $scope.orders.push(data);

        });
    }

    $scope.deleteOrder = function(order) {
        orderFactory.deleteOrder(order, function(data){
            console.log('order deleted in client controller',data);
            // get fresh data
            orderFactory.getOrders(function(data){
                $scope.orders = data;
                console.log("updated orders below");
                console.log($scope.orders);
            });
        });
    }
})