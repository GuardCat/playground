function resizeWindow(sizeCoeff) {
	var	w = screen.availWidth * sizeCoeff,
		h = screen.availHeight * sizeCoeff;
	window.resizeTo(w, h);
	window.moveTo((screen.availWidth - w) / 2, (screen.availHeight - h) / 2);
}

function sewAll() {
	//Секция оригинальных функций
	attachEvent(
		"onscroll", 
		function() {
			tools.gid("upMenu").style.top = document.body.scrollTop + "px";
		}
	);
}
window.onload = function () {
	resizeWindow(0.9);
	//sewAll();
};
