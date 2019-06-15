detectSign = (function() {
	var 
		signs = {
			"Овен":		[new Date("1900/03/21"), new Date("1900/04/20")],
			"Телец":	[new Date("1900/04/21"), new Date("1900/05/20")],
			"Близнецы":	[new Date("1900/05/21"), new Date("1900/06/21")],
			"Рак":		[new Date("1900/06/22"), new Date("1900/07/22")],
			"Лев":		[new Date("1900/07/23"), new Date("1900/08/23")],
			"Дева":		[new Date("1900/08/24"), new Date("1900/09/23")],
			"Весы":		[new Date("1900/09/24"), new Date("1900/10/23")],
			"Скорпион":	[new Date("1900/10/24"), new Date("1900/11/22")],
			"Стрелец":	[new Date("1900/11/23"), new Date("1900/12/21")],
			"Козерог":	[new Date("1900/12/22"), new Date("1901/01/20")],
			"Водолей":	[new Date("1900/01/21"), new Date("1900/02/20")],
			"Рыбы":		[new Date("1900/02/21"), new Date("1900/03/20")]
		}, x, errString = "не определён, потому что введены неверные данные."
	;
	function test(date) {
		for (x in signs) {
			if(date >= signs[x][0] && date <= signs[x][1]) {
			return x;
			}
		}
		return errString;
	}
	function normalize(date) {
		date = date.split(/\D+/g);
		if(date.length < 2 || date.length > 3) {
			return false;
		} else if(date.length === 2){
			date.push("1900");
		} else {
			date.splice(2, 1, "1900");
		}
		if(+date[0] >= 1 && +date[0] <=20 && +date[1] === 1) {
			++date[2]
		}
		date.reverse();
		return date.join("/");
	}
	return function(date) {
		date = normalize(date);
		if(!date){
			return errString;
		}
		date = new Date(date);
		return test(date);
	}
})();