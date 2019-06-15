/*
		Функция groupNums принимает на грудь.
*/
function groupNums(num){
	num = String(num);
	if(!(+num) || !(num.search("e"))) {// не число и экспоненциальный обрабатывать не будем
		return num
	};
	var
		minus = num.substr(0, 1) === "-" 
			?
				num = num.substr(1), "-"
			:
				""
		;
		parts = num.split("."), // делим на целую и дробную части
		num = parts[0],
		start = num.length % 3, // количество первых цифр в числе до пробела
		firstSym = num.substr(0, start) + " " // сами первые цифры
	;
	if(parts.length > 1) {
		parts[1] = "." + parts[1];
	}
	num = num.substr(start);
	if(num.length < 3) {
		return num
	}
	return minus + firstSym + num.match(/\d{3}/g).join(" ") + (parts[1] || "");
}