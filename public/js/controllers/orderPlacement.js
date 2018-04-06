app.controller('orderPlacement',function($scope,$http){
	console.log('orderPlacementCtrl')


//orderplacement button
$scope.confirmOrder = function(orderAddressform){
var mobile = orderAddressform.mobile.$viewValue;
var address = orderAddressform.address.$viewValue;

  console.log($scope.cartdetaillists)
  var orderPlacementDetails = {}
  orderPlacementDetails.orderDetails = $scope.cartdetaillists;
  		orderPlacementDetails.mobile = mobile;
      orderPlacementDetails.address = address;


  console.log(orderPlacementDetails)
        $http.post('/users/admin', orderPlacementDetails).success(function(response) {
      console.log(response);
    });
}

//display address
$scope.getAddress = function(){
console.log("orderplacement page")
    $http.get('/userdetail').success(function(response) {
      console.log(response)
      $scope.addressDetails = response;
    }); 

}
$scope.getAddress();
});