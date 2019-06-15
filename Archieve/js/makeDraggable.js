var makeDraggable = function() {

  function starter() {
    var pos = gc.getPos(this);
    this.x = pos.x;
    this.y = pos.y;
  }
  
  function drag() {
    
  }
  
  return function(element) {
    element.addEventListener("touchstart", starter);
  }
}