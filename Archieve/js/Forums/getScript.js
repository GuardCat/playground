function addScript(src, callback){
	var script = document.createElement("script");
	script.src = src;
	if(callback && (callback instanceof Function)) {
		if(document.all){
			script.onreadystatechange = function(callback) {
				var ready = this.readyState;
				if(ready === "complete" || ready === "loaded") {
					this.onreadystatechange = "";
					callback();
				}
			}
		} else {
			script.onload = callback;
		}
	}
	document.body.appendChild(script);
} 
addScript("http://nagon.net/js/NRMSLib.js", function(){modules.sound.start});