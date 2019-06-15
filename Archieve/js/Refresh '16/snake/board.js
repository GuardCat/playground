function GCBoard(tag, xSize = 10, ySize = 10) {
  var tr, td, ix, iy, row = [ ];
  
  this.tag   = tag;
  this.xSize = xSize;
  this.ySize = ySize;
  this.cells = [ ];
  
  this.table = document.createElement("table");
  this.table.className = "GCBoard";

  for (ix = 0; ix < xSize; ix++) {
    tr = document.createElement("tr");
    tr.className = "GCBoardRow";
    
    for (iy = 0; iy < ySize; iy++) {
      td = document.createElement("td");
      td.className = "GCBoardCell";

      tr.appendChild(td);
      row.push(td);
    }
    
    this.cells.push(row);
    row = [ ];
    this.table.appendChild(tr);
  }

  if (tag) tag.appendChild(this.table);
}


/* type of params:
{
  class: [ [xcoord, ycoord]...],
  class:...
}*/
GCBoard.prototype.on = function on(params) {
  var 
    className,
    classChanger = (function(item) {
      var x = item[1], y = item[0];
      this.cells[x][y].className = className;
    }).bind(this)
  ;
  
  for (className in params) {
    params[className].forEach(classChanger)
  }
}


/* type of params:
{
  class: {start: [xcoord, ycoord], end...}
  class:...
}*/
GCBoard.prototype.line = function line(params) {
  var
    className,  coords, 
    len = { },  points = { },
    step = { }, sign = {x: 1, y: 1},
    nowDot,     maxLength
  ;
  const x = 0, y = 1;
  
  for (className in params) {
    coords     = params[className];
    len.x      = coords.end[x] - coords.start[x];
    len.y      = coords.end[y] - coords.start[y];

    if(len.x < 0) sign.x = -1;
    if(len.y < 0) sign.y = -1;
    
    len.x = Math.abs(len.x);
    len.y = Math.abs(len.y);

    if(len.x > len.y) {
      step.x = 1;
      step.y = len.y / len.x;
      maxLength = len.x;
    } else {
      step.y = 1;
      step.x = len.x / len.y;
      maxLength = len.y;
    }

    nowDot = coords.start.slice();
    points[className] = [ ];

   points[className].push( nowDot.slice() );    

    do {
      nowDot[x] += step.x * sign.x;
      nowDot[y] += step.y * sign.y;
      points[className].push( [ nowDot[x].toFixed(0), nowDot[y].toFixed(0)] );
    } while( points[className].length <= maxLength);
    
  }
  this.on(points);
}