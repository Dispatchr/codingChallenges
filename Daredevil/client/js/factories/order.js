/**
 * Created by Tejas on 10/24/2015.
 */
customersApp.factory('orderFactory', function($http){
    var orders = [];  
    var factory = {};


    factory.getOrders = function(callback){
        $http.get('/orders/show').success(function(output){
            callback(output);
        })
    }

    factory.addOrder = function(newOrder,callback) {
        newOrder.created_at = new Date();

        $http.post('/orders/add',newOrder).success(function(output){
            console.log('new order added in client factory',output);
            console.log(output);
            callback(output);
        })
    }

    factory.deleteOrder = function(order,callback){
        $http.post('/orders/delete',order).success(function(output){
            console.log(output);
            callback(output);
        })
    }
    return factory;
})