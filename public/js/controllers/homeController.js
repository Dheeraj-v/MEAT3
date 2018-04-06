app.controller('homeCtrl',function($scope,$http, ajaxCall){
	 $scope.demo = "home page"

	 console.log($scope.demo)
  	ajaxCall.getMethod().then(function(respdata){
		return $scope.responses = shuffleArray(respdata)

	})
  	var shuffleArray = function(array) {
  		var m = array.length, t, i;

  		// While there remain elements to shuffle
  	while (m) {
    	// Pick a remaining element…
    	i = Math.floor(Math.random() * m--);

    	// And swap it with the current element.
    	t = array[m];
    	array[m] = array[i];
    	array[i] = t;
  	}

  	return array;
	}
});