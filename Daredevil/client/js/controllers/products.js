/**
 * Created by Tejas on 10/24/2015.
 */
// PRODCUTS CONTROLLER

customersApp.controller('productsController', function($scope,productFactory){ 
     $scope.newProduct = {}

    $scope.addFileName = function(files) {
        $scope.newProduct.image = files[0].name;
     }

    $scope.products = [];

    productFactory.getProducts(function(data){
    	$scope.products = data;
    })

    // make addProduct equal to a function and add to scope so it can be called by view
    $scope.addProduct = function(newProduct){
        console.log(newProduct);
    	// if product has a key, then edit; else add
    	if('_id' in newProduct)
    	{
    		console.log('existing product:',newProduct);
	    	productFactory.editProduct(newProduct,function(data){
	    		console.log('edited product',data);
	    		$scope.newProduct = [];
			});
			// run getProducts() again to display updated data
			 productFactory.getProducts(function(data){
		    	$scope.products = data;
		    	console.log($scope.products);
		    });
    	}
    	else
    	{
    		// call factory method, passing in object to add
    		productFactory.addProduct(newProduct,function(data){
	    		$scope.products.push(data);
    		})    	
    	}    	
    }

    $scope.showProduct = function(product){
    	console.log('show product:',product._id);
    	// overwrite form inputs with data to edit
    	var id = product._id;
    	productFactory.showProduct(id, function(data){
    		$scope.newProduct = data;
    		console.log('show one in view controller:',$scope.newProduct);
    	})
    }

    $scope.editProduct = function(product){
    	console.log('edit product:',product);
    	// overwrite form inputs with data to edit
    	productFactory.editProduct(product, function(data){
    		$scope.newProduct = data;
    	});
    }

    $scope.deleteProduct = function(product){
    	console.log('delete product:',product._id);
    	// have to pass this variable as json or will get 400 http error
    	var id = {id:product._id};
    	// overwrite form inputs with data to edit
    	productFactory.deleteProduct(id, function(data){
    		console.log(data);
    	});
    	// get fresh data
    	productFactory.getProducts(function(data){
	    	$scope.products = data;
	    	console.log($scope.products);
	    });
    }

    $scope.clearFormValues = function(){
    	$scope.newProduct = [];
    }

    // $scope.findObjectByProperty = function(arr,property)
    // {
    // 	for (var i=0, i< arr.length; i++) {
		  //   var object = arr[i];

		  //   for (var property in object) {
		  //     if (object.hasOwnProperty(property) && object[property] == value) {
		  //       return object;
		  //     }
		  //   }
		  // }
    // }

})