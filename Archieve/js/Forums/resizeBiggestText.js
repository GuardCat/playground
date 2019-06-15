function resizeBiggestText(newSize) {
	var 
		x, biggestElements = [ ], 
		all = document.body.querySelectorAll("*"), nowMaxSize = 0, 
		thisElSize
	;
	for(x = 0; x < all.length; x++) {
		thisElSize = parseInt(getComputedStyle(all[x]).fontSize);
		if(getComputedStyle(all[x]).display === "hidden" || getComputedStyle(all[x]).type === "hidden") continue;
		if (thisElSize > nowMaxSize) {
			biggestElements.length = 0;
			biggestElements.push(all[x]);
			nowMaxSize = thisElSize;
		} else if (thisElSize === nowMaxSize) {
			biggestElements.push(all[x])
		}
	}
	for(x in biggestElements) {
		if (biggestElements.hasOwnProperty(x)) {
			biggestElements[x].style.fontSize = newSize;
		}
	}
	return biggestElements;
}