Events = ( function() {
    
  return {
    add: document.addEventListener ? // W3C
      function(elem, evt, fn) {
        var tempFn = fn, args = Array.prototype.slice.call(arguments, 3);
        if(arguments.length < 3) return false;
        
        if(arguments.length > 3) { // ���� ���� �������������� ��������� ��� �����������
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
        
        tempFn = ( function(that){ //� ����� ������ �����������, ����� �������� this
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

//Events.add(document, "click", function(e, x, y){alert(e.type + " " + this +  " " + x + y)}, "it's worked!", " Really!")