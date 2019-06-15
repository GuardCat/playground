/* 1.3.1.0 minimum */

( function( toolboxName ) {
  
  var toolbox = function(query, all) {
    return all ? 
      document.querySelectorAll(query) :
      document.querySelector(query)
    ;
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
  
  toolbox.isPortrait = function( ) {
    return Math.abs(window.orientation) != 90;
  }
  
  toolbox.getBeautyTime = ( function() {
    var zeroAdd = function(n) {
      return n >= 10 ? n : "0" + n;
    }
    return function(date) {
      if (!date || !(date instanceof Date) ) {
        date = new Date;
      }
      return zeroAdd(date.getHours()) + ":" + zeroAdd(date.getMinutes()) + ":" + zeroAdd(date.getSeconds())
    }
  } )()

  
  window[toolboxName] = toolbox;
  
} )( "gc" )