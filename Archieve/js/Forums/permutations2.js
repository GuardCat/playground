allPermutations = ( function (text) {

  function _walkFirstSym(text) {
    result = [ ];
    for (x = 0; x < text.length - 1; x++) {
      text = text.substr(0, x) + text.substr(x + 1, 1) + text.substr(x, 1) + text.substr(x + 2);
      result.push(text)
    }
    return result
  }
  
  return function(text) {
    var result = [ ], lastRes;
    while (result.length < text.length) {
      result.push(lastRes = _walkFirstSym(text))
      text = lastRes[ lastRes.length - 1 ]
    }
    return result
  }
} ) ( )
allPermutations("1234")

function factorial(n) {
  return n === 1 ? n : n * factorial(n - 1)
}