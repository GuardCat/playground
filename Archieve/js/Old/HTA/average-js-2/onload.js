/* onload.js для average-js-2.hta*/
var sw = screen.width, sh = screen.height;
var needRecalc = false;
window.onload = function () {
	var textarea, msg;
	window.resizeTo(sw / 1.5, sh / 1.08);
	window.moveTo((sw - sw / 1.5) / 2 ,0);
	textarea = document.getElementsByTagName("textarea")[0]
	sewnToTextarea(textarea);
	
	msg = document.getElementById("msg");
	msg.getElementsByTagName("caption")[0].getElementsByTagName("button")[0].onclick = forMsgCloser;
}
document.body.onkeyup = function () {
	if(event.keyCode === 27) {
		close();
	} else if (event.ctrlKey && event.keyCode == 82) {
		say("Отчёт", giveReport());
		
	}
}