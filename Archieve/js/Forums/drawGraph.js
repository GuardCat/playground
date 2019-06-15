function drawGraph(func, start, end, step) {
  "use strict";
  var pset, x, px = "px";
  for (x = start; x <= end; x += step) {
    pset = document.createElement("div");
    pset.style.position = "absolute";
    pset.style.left = x + px;
    pset.style.top = func(x);
    pset.style.width = "10px";
    pset.style.height = "10px";
    pset.style.color = "black";
    document.body.appendChild(pset)
  }
}