/* Классическая игра «snake» */

var snakeModules = {

    /* Паттерн "медиатор" в формате фабрики объектов */
    media: function () {
        var eventsList = {};

        return {

            /* Метод set Регистрирует подписку на событие.
             *   
             *   @param eventName {String} наименование события
             *   @param fn {Function} функция для вызова по событию
             *   
             *   @return {Number} номер зарегистрированной функции для 
             *                    её удаления из подписки
            */
            "set": function (eventName, fn) {
                if (!eventName || !fn) return !1;
                
                if ( !(eventName in eventsList) ) eventsList[eventName] = [];
                
                eventsList[eventName].push({
                    "eventName": eventName,
                    "fn"       : fn
                });
                
                return eventsList[eventName].length - 1;
            },

            /* Метод go запускает функции, привязанные к произошедшему событию.
             *   
             *   @param eventName {String} наименование события
             *   @param context {Object} объект для присвоения this
            */
            "go": function (eventName, context) {
                var x;
                if (!eventName || !(eventName in eventsList) || eventsList[eventName].length === 0) return !1;
                                
                for (x in eventsList[eventName]) {
                    eventsList[eventName][x].fn.apply( 
                        context, 
                        [].slice.call(arguments, 2) 
                    );
                } 
            },
            
            /* Метод unset удаляет вызов функции для события или
             * полностью удаляет подписку, если не указан id.
             *
             *   @param eventName {String} наименование события.
             *   @param id {Number} номер функции для удаления, при отсутствии параметра,
             *                      удаляются все функции для события.
             *   
             *   @return {Boolean} true для успешного удаления.
            */            
            "unset": function (eventName, id) {
                if (!eventName || !(eventName in eventsList) || eventsList[eventName].length - 1 < id) return !1;
                if (id === undefined) return delete eventsList[eventName];
                return eventsList[eventName].splice(id,1);
            }
            
        }; /* function media */
    },

    drawSnake: function () {},

    Board: (function () {
        /* модуль, генерирующий таблицу заданного размера,
         а также умеющий менять классы ячеек по массиву координат */

        // конструктор
        var Board = function (ySize, xSize, mediator) {
          this.media = media;
          this.ySize = ySize;
          this.xSize = xSize;
        
        };

        // Прототип конструктора
        Board.prototype = {
            constructor: Board
        };

    })(),

    Message: function () {
        /* Должна уметь, на основании переданного объекта, создавать экземпляр, 
           умеющий менять innerHTML элементов, дополнять его или выводить alert'ы
       */
    }
};
а
function Snake() {}

// Тестируем медиатор
console.info("____________________________");
var m = snakeModules.media();
    
function test(x) {
    console.log( this[x] );
}

var o = {
    f:1,
    s:2
  }, b = { f: "first", s: "second" }
;

m.set( "light", test, o);
var bId = m.set( "light", test);
var nId = m.set( "night", function(){console.log("Light is on");} );

m.go("light", this, "f");
m.unset("light",0, 0)   ;
m.go("light", b, "s")   ;
m.go("night")           ;


