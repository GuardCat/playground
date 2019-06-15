// Стартовые функции
var 
	excel = new ActiveXObject("excel.application"),
	mainName
;
window.onload = function () {
	if(window.excel) {
		makeToast("Успешно создан объект Excel", "i");
	}
	window.resizeTo(1000, screen.height - 100);
	window.moveTo(100, 10);
	document.title += " v " + XLBlade.version;
}
window.document.onkeydown = function () {
	if (event.keyCode === 27) {
		if (excel.activeWorkbook){
			if (confirm("Действительно выйти?")){
				goExit();
			}
		} else {
			goExit();
		}
	}
}
window.onunload = function() {
	goExit(true);
}
function goExit(noClose) {
	excel.displayAlerts = 0;
	excel.quit();
	noClose || window.close();
}