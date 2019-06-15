function doIt() {
	returnValue = prompt("Введите данные для возврата");
	window.close();
}

document.getElementById("runDoIt").onclick = doIt;
