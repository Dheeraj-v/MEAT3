app.filter('unique', function() {
  
   return k= function(collection, keyname) {
      var output = [], 
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname].trim().toLowerCase();
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });
      k=output;
      return output;
   };

});

app.filter('capitalize', function() {  
  return function(input){
    if(input != undefined && input.indexOf(' ') !== -1){
      var inputPieces,
          i;

      input = input.toLowerCase();
      inputPieces = input.split(' ');

      for(i = 0; i < inputPieces.length; i++){
        inputPieces[i] = capitalizeString(inputPieces[i]);
      }

      return inputPieces.toString().replace(/,/g, ' ');
    }
    else if(input != undefined){
      input = input.toLowerCase();
      return capitalizeString(input);
    }

    function capitalizeString(inputString){
      return inputString.substring(0,1).toUpperCase() + inputString.substring(1);
    }
  };
});