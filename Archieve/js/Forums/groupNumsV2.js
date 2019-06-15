/**
		Функция groupNums принимает число или 
	строку, которую конвертирует по правилам
	parseFloat.
		Возвращает строку, где цифры числа
	сгруппированы по разрядам и отделены друг от
	друга пробелом. Если конвертация в число
	невозможна или число в научном формате и не
	разворачивается при конвертации, будет
	возвращено строковое представление переданного
	аргумента.
		Недесятичные числа конвертируются в 
	десятичные. Часть строки, отброшенная при
	конвертации, приписывается справа к 
	результату работы функции, т.е. можнл передавать
	10000р., например.
*/
function groupNums(num){
	var 
		minus = fractionPart = firstsDigits = textPart = "",
		dotPosition,
		rawText = num + ''
	;
	num = parseFloat(rawText) + '';

	if(num === "NaN" || ~num.indexOf("e")) {// Нечисло и научный формат не обрабатываем
		return rawText;
	}

	textPart = rawText.substr(num.length);

	if(num.substr(0, 1) === "-") {// Разбор отрицательных чисел
		minus = "-";
		num = num.substr(1);
	}

	if(~(dotPosition = num.indexOf("."))) {// Разбор дробей
		fractionPart = num.substr(dotPosition);
		num = num.substr(0, dotPosition)
	}

	if(num.length < 4) {
		return rawText;
	}

	firstsDigits = num.substr(0, num.length % 3);
	num = num.substr(firstsDigits.length);
	num = num.match(/\d{3}/g).join(" ");
	firstsDigits += firstsDigits.length > 0 ? " " : "";

	return minus + firstsDigits + num + fractionPart + textPart;
}