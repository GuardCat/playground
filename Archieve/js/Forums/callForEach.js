/* VERSION 1.0 */


/**
  Вызывает указанную функцию с каждым из
  указанных аргументов с перерывом в ms миллисекунд.
  
  @param fn {function} функция для вызова
  @param args {array} массив аргументов
  @param ms {int} задержка между вызовами в мс.
*/
function callForEach(fn, args, ms) {
  var n = 0;                      //Счётчик для переключения аргументов.
  
  setTimeout(                     // Первый запуск.
  
    function caller() {           // Функция-обёртка для хранения счётчика. 
      fn( args[n++] );              // Вызываем функцию с очередным аргументом и прибавляем счётчик одновременно.
      if (n < args.length) {
        setTimeout(caller, ms);   // Если ещё не все аргументы перебраны, обёртка запускает сама себя через указанное время.
      }
    }
    
  ,ms )
}

//Ниже — пример: нужно вызвать функцию show с каждым элементом массива arr, с интервалом 1с.

arr = [0, 1, 2, 3];

function show(text) {
  alert(text);
}

// Запускаем
callForEach( show, arr, 1000);


/* VERSION 2.0 */


/**
  *Создаёт экземпляр CallerForEach
  *@constructor
  *@param {function} функция для вызова с аргументами
  *@param {array} массив аргументов для поочерёдного вызова функции
  *@param {integer} количество миллисекунд через которое повторяется 
    вызов функции с очередным параметромё
*/
function CallerForEach( fn, args, ms ) {
  var n = 0, ok = true, timerId;
  
  this.start = function() {
    setTimeout ( function innerCaller() {
      fn( args[n++] );
      if ( n >= args.length ) n = 0;
      if (ok) timerId = setTimeout( innerCaller, ms );
    }, ms );
    ok = true;
  }
  
  this.stop = function() {
    ok = false;
    clearTimeout( timerId ); // Чтобы вызов не повторялся ещё один раз.
  }
}

// Пример применения.
var arr = [0,1,2,3,4,5];
var timer1 = new CallerForEach(show, arr, 2000);
function show(t) {
  window.console.log(t);
};

timer1.start(); //Запуск

//timer1.stop(); // остановка