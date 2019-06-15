var arr = [
  "(1,1,4)",
  "(5,2,1)",
  "(1,5,2)"
];



function findMin(arr, count) {
  var i, j, x, result = [ ],  tempArr = [ ], text = "";
  count = count || arr.length;
  arr.forEach( function( el, i, arr ) {
    arr[i] = el.match(/\d+/g);
  } )

  for (i = 0; i < arr.length; i++) {
    for (j = 0; j < arr[i].length; j++) {
      tempArr.push( {val: arr[i][j], ad: [i + 1, j + 1]} );
    }
  }
  tempArr.sort( function(a, b) {return a.val - b.val});

  while (count--) {
    result.push( tempArr[0] );

    tempArr = tempArr.filter( function(a) {
        return !result.some( function(b) {
            return (a.ad[0] === b.ad[0] || a.ad[1] === b.ad[1]); 
        } )
    } )

  }

  result.sort( function( a, b ) { return a.ad[0] - b.ad[0] } );

  result.forEach( function(a, i, arr){ 
    text += "(" + a.ad[0] + "-" + a.ad[1] + ")";
  } );

  return text;
}

gc.info( findMin(arr) );