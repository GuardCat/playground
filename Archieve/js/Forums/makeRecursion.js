/**
  Возвращает функцию, которая с каждым вызовом
  возвращает всё более рекурсивный результат.
  
  @param {function} fn функция для зацикливания
  @param {} аргумент, скоторым будет вызвана fn
  
  @return {function} саморекурсирующая функция
*/
function makeRecursion( fn, num ) {

  return ( function( fn, num ) {
    var callingCount = 0; // Здесь храним количество вызовов
    
    function cycle(depth, num) {
      if (!depth) return fn(num);
      return cycle( --depth, fn(num) );
    }
    
    return function() {
      return cycle( callingCount++, num );
    }
  } )( fn, num )
}

// Пример использования, ручная проверка
function summ(x) {
  return x + 1;
}

m = makeRecursion( summ, 0 );
alert( m() );//1
alert( m() );//2

/**
  Функция, проверяющая правильность работы функции,
  возвращающей саморекурсирующие функции.
  
  @param {function} makeRecursionFn функция для проверки
  @param {function} fn функция, которую передадим проверяемой
  @param num аргумент для fn
  @param {array} results массив эталонных результатов произвольной длины

  @return {string} строковый отчёт о результате проверки
*/
testMakeRecursion = function( makeRecursionFn, fn, num, results ) {
  var 
    r = results.slice(0),
    recFn = makeRecursionFn( fn, num ),
    depth = r.length
  ;
	
  while (r.length) {
    if ( !( r.shift() === recFn() ) ) {
      return "Функция работает неверно. Ошибка на вызове " + ( depth - r.length );
    }
  }
	return "Функция работает верно. Все результаты совпали с эталоном."
} 

arr = [1, 2, 3, 4, 5] // Такие ответы должны получить

alert( testMakeRecursion( makeRecursion, summ, 1, arr ) );