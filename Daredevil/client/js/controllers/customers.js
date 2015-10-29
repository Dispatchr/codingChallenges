/**
 * Created by Tejas on 10/24/2015.
 */
//CUSTOMER CONTROLLER
customersApp.controller('customersController',function($scope,customerFactory){  

	$scope.customers = [];

	customerFactory.getCustomers(function(data){
		$scope.customers = data;
	});

	// pass customer to factory deleteCustomer() function
	$scope.deleteCustomer = function(customer){
       customerFactory.deleteCustomer(customer, function(data){
       		console.log('deleted data in view controller',data);       		
            // remove this customer from customers array that user sees
            $scope.customers.splice($scope.customers.indexOf(data),1);
       });
	};

    $scope.addCustomer = function(newCustomer){           
    	// run addCustomer() function
        customerFactory.addCustomer(newCustomer,function(data){
        	console.log('new data in view controller',data);
        	// add returned object(record) to customers scope
        	$scope.customers.push(data);
        });   
    };

    $scope.editCustomer = function(customer){
        customerFactory.editCustomer(customer, function(data){

            console.log('edited data in view controller',data);
            $scope.newCustomer=data;
        });
    };

	$scope.validateCustomer = function(newCustomer){
		var duplicateCustomer = 0;

		console.log('disabled?',$scope.isDisabled);

		// loop array of customer objects
		for (var i=0; i<$scope.customers.length; i++)
		{
			console.log('name:',$scope.customers[i].name);

			if ($scope.newCustomer.name == $scope.customers[i].name)
			{    						
				duplicateCustomer = 1;
				console.log('is duplicate?' + duplicateCustomer);
			}
		}

		if(!duplicateCustomer)
		{
			// enable button
			$scope.add.$invalid = false;	
		}  
		else
		{
			// disable button
			$scope.add.$invalid = true;
		} 

		return $scope.isDisabled;
	}
});