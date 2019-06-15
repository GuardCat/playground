// Поиск всех сочетаний

var
    firstArr = "abcde".split(""),
    lastArr = [ ],
    result,
    x,y,z
;

for (x = 0; x < firstArr.length - 1; x++) {
    for (y = x + 1; y < firstArr.length; y++) {
        lastArr.push( [x, y] )
    }
}

result = lastArr.slice();

for (x = 0; x < firstArr.length; x++) {
  for (y = 0; y < lastArr.length; y++) 
    lastArr[y].push(x);
  }
  result = result.concat(lastArr);
}

result.forEach( gc.log );