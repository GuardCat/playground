/*Array_extensions.js для average-js-2.hta*/

/* 	Изменяет массив, записывая на место каждого
	элемента результат работы с ним функции func.
	Ничего не возвращает.						*/
Array.prototype.forEach = function (func) {
	if(this.length == 0) {
		return false
	}
	var x, result = [];
	for(x = 0; x < this.length; x++) {
		this[x] = func(this[x]);
	}
}
/* 	Изменяет массив, удаляя элементы, совпавшие с valForDrop.
	Ничего не возвращает.									*/
Array.prototype.filter = function (valForDrop) {
	var x, result = [];
	for (x = this.length; x >= 0; x--) {
		if(this[x] === valForDrop) {
			this.splice(x, 1);
		}
	}
}