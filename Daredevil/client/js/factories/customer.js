/**
 * Created by Tejas on 10/24/2015.
 */
// CLIENT FACTORY
customersApp.factory('customerFactory', function($http){
	// controller calls upon this factory - factory gets data from the server-side
	var factory = {};
    var customers = [];

	// return the object we defined
	factory.getCustomers = function(callback){
		// pass data to a callback to be used by whoever calls method
		// callback is for passing data from factory to controller
        $http.get('/customers/show').success(function(output){
            // set customers to db output
            console.log(output);
            customers = output;
            // on success, run callback function, returning data
            callback(customers);
        })		
	};

    factory.addCustomer = function(newCustomer,callback){                                        
        // add created_date to newCustomer object

        newCustomer.created_at = new Date();    

        console.log('in customerFactory',newCustomer);

        $http.post('/customers/add',newCustomer).success(function(output){
            console.log('factory data added:');
            console.log(output);
            callback(output);
        });
    };

    // return method data from factory
    factory.deleteCustomer = function(customer,callback){
        // remove this customer (by value) from customers array
        $http.post('/customers/delete',customer).success(function(output){
            console.log('factory data deleted:', output);
            callback(output);
        });
    };

    //return method data from factory
    factory.editCustomer = function(customer, callback){
        console.log(customer);
        $http.post('/customers/edit',customer).success(function(output){
            console.log('factory data edited:',output);
            callback(output);
        })
    }

	// return the object so it can be used
	return factory;
})
