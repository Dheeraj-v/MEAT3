app.controller('chickenCtrl',function($scope,$http, ajaxCall){
    
	 $scope.demo = "chicken page"

	 console.log($scope.demo)
  	ajaxCall.getMethod().then(function(respdata){
		$scope.responses = respdata

	})
	 $scope.random = function() {

        var s =  Math.floor((Math.random() * 100) + 1);
        console.log(s)
        return s ;
    }
});