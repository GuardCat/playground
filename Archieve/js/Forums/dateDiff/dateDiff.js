/* 
		Функция DateDiff рассчитывает разницу между датами.
	Принимает даты или в виде строк (в формате гггг / мм / дд,
	допускается указание времени в стандартном формате) или
	в виде объекта Date. Если одна из дат (или обе) будут пропущены,
	то их значением будет new Date() (текущая дата).
		Возвращает строку, с подробным расчётом разницы, включая
	года, месяцы, дни, часы, минуты и секунды. Расчёт с погрешностью.
	Исходим из того, что в каждом месяце в среднем 30.5 дня.
		Если передать функции третьим аргументом true, то функция
	вернёт объект, содержащий числовые значения разницы. Формат
	объекта: {
		years: 0,
		months: 0,
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	}
*/

function dateDiff (dateFrom, dateTo, inObjectPlease) {
	// Нормализуем данные
	dateFrom = dateFrom || new Date(); dateTo = dateTo || new Date ();
	dateFrom = Date.parse(new Date(dateFrom)); dateTo = Date.parse (new Date(dateTo));
	// Объявим всё, что нужно для работы.
	var 
		secDiff = (dateTo - dateFrom) / 1000, x,
		subZero = false, dividers = [60, 60, 24, 30.5, 12],
		result = {
			years: 0,
			months: 0,
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0
		}
	;
	/*
			Если разница отрицательна, запомним это и сделаем её положительной,
		для упрощения расчётов.
	*/
	if (secDiff < 0) {
		subZero = true;
		secDiff *= -1;
	}
	/*
			Функция arrayMultiply возвращает произведение элементов 
			переданного ей массива.
	*/
	function arrayMultiply (arr) {
		var result = 1, x;
		for (x = 0; x < arr.length; x++) {
			result *= arr[x];
		}
		return result;
	}
	/*
			Функция pickWord возвращает слово в форме, подходящей для
		переданной функции цифре. Принимает цифру и три формы слова —
		для значения 1, для значения 2 и для значения 5.
	*/
	function pickWord(num, txt1, txt2_4, txt5) {
		var symb;
		num = parseInt(num);
		if (isNaN(num)) {
			return txt1;
		}
		num = String(num);
		if (num.length > 1) {
			symb = num.substr(-2);
			symb = +symb;
			if (symb >= 10 && symb <= 20) {
				return txt5;
			}
		}
		symb = num.substr(-1);
		symb = +symb;
		if (symb === 1) {
			return txt1;
		}
		if (symb >= 2 && symb <= 4) {
			return txt2_4;
		}
		return txt5;
	}
	/*
			Вспомогательная функция next уменьшает количество делителей на единицу
		и разницу между датами в секундах на необходимое значение.
	*/
	function next(success, subtrahend) {
		if (success) {
			secDiff -=  subtrahend;
		}
		if (dividers.length > 0) {
			dividers.length -= 1;
		}
	}
	for (x in result) {
		result[x] = (secDiff - secDiff % arrayMultiply(dividers)) / arrayMultiply(dividers);
		next(result[x], (secDiff - secDiff % arrayMultiply(dividers)));
		if (subZero) {
			result[x] *= -1;
		}
	}
	if (inObjectPlease) {
		return result
	}
	// формируем строку.
	result.result = result.years ? result.years + pickWord(result.years, " год ", " года ", " лет "): "";
	result.result += result.months ? result.months + pickWord(result.months, " месяц ", " месяца ", " месяцев "): "";
	result.result += result.days ? result.days + pickWord(result.days, " день ", " дня ", " дней "): "";
	result.result += result.hours ? result.hours + pickWord(result.hours, " час ", " часа ", " часов "): "";
	result.result += result.minutes ? result.minutes + pickWord(result.minutes, " минута ", " минуты ", " минут "): "";
	result.result += result.seconds ? result.seconds + pickWord(result.seconds, " секунда ", " секунды ", " секунд "): "";
	return result.result;
}