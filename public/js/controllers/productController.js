app.controller('productCtrl',function($scope,$http, ajaxCall,$routeParams){
    
	 $scope.demo = "product page"

	 console.log($routeParams.itemName)
  	ajaxCall.getMethod().then(function(respdata){
		$scope.responses = respdata
		var responses = respdata;
		responses.forEach(function(items, index, arr){
				//console.log(item)
				if($routeParams.itemName == items.itemName)
					return $scope.items = items
		})

	})

});