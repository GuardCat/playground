function normalTime() {
	var
		dateTime = new Date(),
		timeArray = [
			dateTime.getHours(),
			dateTime.getMinutes(),
			dateTime.getSeconds()
		], 
		x, num
	;
	for(x = 0; x < timeArray.length; x++) {
		num = timeArray[x]; 
		timeArray[x] = num < 10 ? "0" + num : num; 
	}
	return timeArray.join(" : ");
}

showTime = (
	function() {
		var watch = document.createElement("p");
		watch.id = "watch";
		document.body.appendChild(watch);
		return function() {
			watch.innerHTML = normalTime();
		}
	}
)()
setInterval(showTime, 1000);