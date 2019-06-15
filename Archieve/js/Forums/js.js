(
	function () {
		var scriptsList = [
			"js/index/jquery.js",
			"js/index/popup.js",
			"js/index/time.js",
			"js/index/interface.js",
			"js/index/zoom.js",
			"js/index/mac.js",
			"js/win7/tipTip.js",
			"js/win7/tip.js",
			"js/index/img_preload1.js"
		], x;
		function addScriptTag(src) {
			var tag = document.createElement("script");
			tag.src = src;
			document.body.appendChild(tag);
		}
		for(x = 0; x < scriptsList.length; x++) {
			addScriptTag(scriptsList[x]);
		}
	}
)()
