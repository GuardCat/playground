function posl() {
  var 
    u = prompt("Введите число",""), 
    myArray = [ ], max = 0, item, amount = 1
  ;
  while (myArray.length < u) {
    item = +prompt( "Введите число", "" );
    myArray.push( item );
    document.write( item + "<br>" );
    
    if( max < item ) {
      amount = 1;
      max = item;     
    } else if ( item === max ) {
      amount++;
    }
  }
  alert( "Максимальное число: " + max + " Таких чисел в массиве: " + amount )
}
posl()