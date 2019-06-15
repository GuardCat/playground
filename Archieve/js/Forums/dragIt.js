function MakeDraggable(element) {
	element.style.position = "absolute";
	element.onmousedown = function (e) {
		e = e || window.event;
		this.setAttribute("data-startX", e.pageX);
		this.setAttribute("data-startY", e.pageY);
	}
	element.ondrag = function (e) {
		e = e || window.event;
		var sx = element.getAttribute("data-startX"), sy = element.getAttribute("data-startY"), ex = this.style.left, ey = this.style.top;
		this.style.left = parseInt(ex) - (sx - e.pageX) + "px";
		this.style.top = parseInt(ey) - (sy - e.pageY) + "px";
	}
}