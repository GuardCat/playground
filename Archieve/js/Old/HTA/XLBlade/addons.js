function gid (txt){return document.getElementById(txt)}

function makeToast (txt, type) {
		var r = "\n\r";
		txt = txt || ""; type = type || "i"; type = type.substr(0, 1);
		if(!gid("toaster").innerText) r = ""
		if(txt.substr(txt.length - 1) !== ".") txt += ".";
        gid("toaster").innerText = type + " — "  + txt + r + gid("toaster").innerText;
}
Array.prototype.check = function (elForCheck) {
	var x;
	for(x = 0; x < this.length; x++) {
		if (this[x] === elForCheck) return true;
	}
	return false;
}
function stringify(num) {
	return String(num) + ":" + String(num);
}
function copyRow(rowNumber) {
	excel.workBooks(mainName).activate();
	excel.activeWorkbook.activeSheet.Rows(stringify(rowNumber)).select();
	excel.selection.copy()
}
function pasteRow(name, rowForInsert){
	excel.workbooks(name).activate();
	excel.activeWorkbook.activeSheet.rows(rowForInsert).select;
	excel.activeWorkbook.activeSheet.Paste();
}
/*
	Функция msToNorm пересчитывает переданные ей миллисекунды в часах минутах
	и секундах. Возвращает строку вида чч:мм:сс.
*/
function msToNorm (ms) {
	var seconds, minutes, hours;
	seconds = ms / 1000;
	hours = (seconds - seconds % 3600) / 3600;
	seconds = seconds % 3600;
	minutes = (seconds - seconds % 60) / 60;
	seconds = (seconds % 60).toFixed(0);
	hours = String(hours);
	minutes = String(minutes);
	seconds = String(seconds);
	if (seconds.length < 2) seconds = "0" + seconds;
	if (minutes.length < 2) minutes = "0" + minutes;
	if (hours.length < 2) hours = "0" + hours;
	return hours + ":" + minutes + ":" + seconds;
}
/*
	Функция injectSelect принимает объект select и ассоциативный массив.
	Select очищается, затем в него добавляются элементы option,
	значение которых устанавливают ключи массива, а текст — значения массива.
	Ничего не возвращает.
*/
function injectSelect (sel, rowsObject) {
	var opt, x;
	sel.innerHTML = "";
	for (x in rowsObject) {
		opt = document.createElement("option");
		opt.value = x;
		opt.innerHTML = rowsObject[x]
		if(rowsObject[x] == "Представительство") opt.selected = true;
		sel.appendChild(opt);
	}
}
function getCaptions () {
	var x = 1, t, result = {}, captionText;
	while (captionText  = excel.activeWorkbook.activeSheet.columns(x).rows(1).formula) {
		result[x] = captionText;
		x++;
	}
	if (x > 1) return result;
	return false;
}