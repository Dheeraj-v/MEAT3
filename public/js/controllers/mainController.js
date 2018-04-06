app.controller('mainCtrl',function($scope,$http){
    $scope.viewItems = 1;
    $scope.menuItems = ['home','chicken', 'mutton', 'fish']
    $scope.activeMenu = $scope.menuItems[0];
    $scope.cartdetaillists = []
    console.log($scope.menuItems)
   $scope.setActive = function(menuItem) {
    $scope.activeMenu = menuItem
 }

 
    
  
  //add
 	$scope.addToCart = function(event,ajaxCall){
    $scope.refresh();
    var canBeAdded=  true;
    $scope.quantity = 1
 		$scope.itemName = angular.element(event.target).data('id')
 		$scope.itemPrice = angular.element(event.target).data('amount')
    $scope.totalPrice = parseInt($scope.itemPrice) * parseInt($scope.quantity)
   var cartsTofilled = {
      itemName: $scope.itemName,
      price:$scope.itemPrice,
      totalPrice:$scope.totalPrice,
      quantity:$scope.quantity
   }
    angular.forEach($scope.cartdetaillists, function(value, key){
      if(value.productname == cartsTofilled.itemName){
        canBeAdded=  false;
      }
    });
    if(canBeAdded == true){
    console.log(cartsTofilled)
    $http.post('/users', cartsTofilled).success(function(response) {
      console.log(response);
    });
    }
 	}


$scope.getAllOrders = function(){
alert("admindashboard page")
    $http.get('/adminboard').success(function(response) {
      console.log(response)
      //$scope.addressDetails = response;
    }); 

}


  //load
  $scope.refresh = function(){
    console.log("refresh")
    $http.get('/users').success(function(response) {
      console.log(response)
      $scope.cartdetaillists = response;
    });
  }

  $scope.refresh();
  

// delete
  $scope.remove = function(id) {
  $http.delete('/users/'+id).success(function(response) {
   $scope.refresh();
  });
};

//update
$scope.update = function(cartdetaillist){
   cartdetaillist.totalprice = cartdetaillist.productamount * cartdetaillist.quantity;
    $http.put('/users/' + cartdetaillist._id, cartdetaillist).success(function(response) {
     $scope.refresh();
  })

}



});

