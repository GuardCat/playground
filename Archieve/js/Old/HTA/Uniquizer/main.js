Array.prototype.check = function (elForCheck) {
	var x;
	for(x = 0; x < this.length; x++) {
		if (this[x] === elForCheck) return true;
	}
	return false;
}
function arrayFilter (array, txt) {
	var x, result = [];
	for (x = 0; x < array.length; x++) {
		if (array[x] !== txt) result.push(array[x]);
	}
	return result;
}
function uniquize(array, shift) {
	var result = [], x;
	shift = shift || 0;
	for (x = shift; x < array.length; x++) {
		if (!result.check(array[x])) result.push(array[x]);
	}
	return result;
}
function doIt() {
	try {
		var mainArray = clipboardData.getData("Text").split("\r\n");
		if (mainArray.length > 1) {
			mainArray = arrayFilter(mainArray, "");
			mainArray = uniquize(mainArray, 1)
			clipboardData.setData("Text", mainArray.join("\r\n"));
			alert("Готово");
			window.close();
		} else {
			alert("Вы не скопировали данные");
		}
	} catch (e) {
		alert("Вы не скопировали данные");
	}
}
window.resizeTo(200,200);
document.getElementById("runDoIt").onclick = doIt;
document.onkeydown = function () {
	if(window.event.keyCode === 27) window.close();
}