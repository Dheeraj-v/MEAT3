app.controller('adminboardCtrl',function($scope,$http){
	console.log('adminboard page')
	 $http.get('/users/admin').success(function(response) {
      console.log(response)
      $scope.orderplacedDetails = response;
    }); 
});