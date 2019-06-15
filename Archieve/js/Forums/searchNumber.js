function searchNumber(min, max) {
	var coefficient
	while((max - min) > 0) {
		coefficient = +((max - min) / 2 + min).toFixed(0);
		if(confirm("Ваш возраст больше или равен " + coefficient + "?")) {
			min = coefficient;
		}	 else {
			max = coefficient - 1;
		}
	}
	alert("Ваш возраст равен " + max);
}
searchNumber(0, 128);