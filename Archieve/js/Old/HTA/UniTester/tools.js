(function (exportTo){
	var x;
	window[exportTo] = {
		gid: function(txt) {
			return document.getElementById(txt);
		},
		runObj: function(obj, that){
			that = that || window;
			for(x in obj) {
				if(obg[x] instanceof Function){
					obg[x].apply(that, Array.prototype.slice.call(arguments, 2));
				}
			}
		}
	}
})("gc")