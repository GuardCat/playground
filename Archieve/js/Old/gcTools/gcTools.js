/* 1.3.0.0 minimum */

( function( toolboxName ) {
  
  var 
    toolbox = function(query, all) {
      return all ? 
        document.querySelectorAll(query) :
        document.querySelector(query)
      ;
    }, x
  ;
  
  /** 
    val собирает значения элементов
      @param {string} txt CSS-селектор для выбора элементов.
      @param {boolean} all Выбирать все элементы? (Если нет, только первый).
      @param {boolean} onlyText брать только текст (innerText) для элементов без value?

      @return {array} список значений найденных элементов.
      @return {string} единственное значение, если all === false.      
  */
  toolbox.val = ( function() {
  
    var _grab = function(el, onlyText) {
      return el instanceof Object ?
        "value" in el ?
          el.value :
          onlyText ?
            el.innerText :
            el.innerHTML :
        void(0)
      ; 
    };
       
    return function(txt, all, onlyText) {
      var x, el = window[toolboxName](txt, all), result;
          
      if (all) {
        result = [ ];
        for (x = 0; x < el.length; x++) {
          result.push( _grab( el[x], onlyText ) );
        }
      } else {
        result = _grab(el, onlyText);
      }
       
      return result;
    }
  } )();
     
  /** 
    Возвращает значения value в массиве для 
    элементов с checked = true из списка всех
    с указанным именем.
  */
  toolbox.getCheckedValues = function(name, all) {
    var x, elements = document.getElementsByName(name), result = [ ];
    for (x = 0; x < elements.length; x++) {
      if (elements[x].checked) {
        result.push(elements[x].value);
        if (!all) {
          result = result[0];
          break;
        }
      }
    }
    return result;
  };
    
  toolbox.toBorn = function(nodeName, values, parentNode){
    var x, element = document.createElement(nodeName);
    values = values || {};
    for (x in values){
      element[x] = values[x];
    }
    if (parentNode) {
      parentNode.appendChild(element);
    }
    return element;
  };
      
  toolbox.getPos  = function(element) {
    var result = {x: 0, y: 0};
    if (!element) return result;

    while ("offsetTop" in element) {
      result.x += element.offsetLeft;
      result.y += element.offsetTop;
      element = element.parentNode;
    }
    return result;
  };
  
  /**
    Работа с событиями
  */
  toolbox.events = ( function() {
    return {
      add: document.addEventListener ? // W3C
        function(elem, evt, fn) {
          var tempFn = fn, args = Array.prototype.slice.call(arguments, 3);
          if(arguments.length < 3) return false;
          
          if(arguments.length > 3) { // Если есть дополнительные аргументы для обработчика, оборачиваем
            tempFn = ( function( args, that ) {
                return function(e) {
                  var argsWithE = args.slice();
                  argsWithE.unshift(e);
                  fn.apply(that, argsWithE);
                }
            } )(args, elem);
          }
          
          elem.addEventListener(evt, tempFn,  false);
          return tempFn;
        } :  // IE
        
        function (elem, evt, fn) {
          var tempFn, args = Array.prototype.slice.call(arguments, 3);
          if(arguments.length < 3) return false;
          
          tempFn = ( function(that){ // для IE любом случае оборачиваем, чтобы передать this
            return function(e) {
              var argsWithE = args.slice();
              argsWithE.unshift(window.event);
              fn.apply(that, argsWithE)
            };
          } )(elem, args)
          
          elem.attachEvent("on" + evt, tempFn, elem);
          return tempFn;
        }
      ,
      
      remove: document.addEventListener ?
        function(elem, evt, fn) {
          elem.removeEventListener(evt, fn, false)
        } :
        function(elem, evt, fn) {
          elem.detachEvent(evt, fn)
        }
      //;
    }
  } )();
  
  window[toolboxName] = toolbox;
  
} )( "gc" )