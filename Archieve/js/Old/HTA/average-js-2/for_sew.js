/* for_sew.js для average-js-2.hta*/

function forTextareaKeys () {
	if(window.event.keyCode === 13) {
		return false;
	}		
	if (window.event.keyCode === 32 || needRecalc) {
		var txt, arr, result, recipient;
		var r = /[\f|\r|\n]/g;
		txt = this.innerHTML;
		arr = txt.split(" ");
		arr = toFormate(arr);
		arr.forEach(numberize);
		arr.filter("");
		result = average(arr);
		recipient = this.parentNode.parentNode.cells[0];
		recipient.innerHTML = "<div>" + "Введено значений: <b>" + result.count + "</b></div>";
		recipient.innerHTML += "<div>" + "Среднее арифметическое: <b>" + result.result + "</b></div>";
		needRecalc = false;
		this.innerHTML = arr.join(" ");
	}
}
function forTextareaFocus () {
	var textareas = document.getElementById("mainTable").getElementsByTagName("textarea");
	if(this == textareas[textareas.length - 1]) {
		addRow();
	}
}
function forTextareaBlur () {
	var txt = this.innerHTML;
	if(txt.substr(txt.length-1) !== " ") {
		this.innerHTML += " ";
		needRecalc = true;
		this.onkeypress();
	}
}
function forTextareaDblclick () {
	this.innerHTML = "";
	needRecalc = true;
	this.onkeypress();
}
function forMsgCloser() {
	document.getElementById("msg").style.display = "none";
}