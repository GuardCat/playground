(function (exportTo) {
	window[exportTo] = {
		"document.body.onscroll": {
			fixPosition: function () {
				tools.gid("upMenu").style.top = document.body.scrollTop + "px";
			}
		}
	}
})("forSew")