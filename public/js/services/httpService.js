app.factory('ajaxCall', function($http){
    return{
      getMethod: function(){
        var getresult = $http({
              method: 'GET',
                url:'data/list.json'
              }).then(function (response) {
                return response.data;
              }, function (response) {
                 console.log("failure");
              });
          return getresult;
      }
    };  
});