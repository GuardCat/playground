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
!
		hours: 0,
		minutes: 0,
		seconds: 0
	}
*/

function DateDiff( date1, date2 ) {
  var
    x,          /* счётчик для циклов */
    step = -1,  /* счётчик для смены делителей при разборе разницы */
    diff,       /* для работы с разницей в секундах */
    nowRes = 0  /* для промежуточного результата */
  ;
  for (x = 0; x < 2; x++) { // Нормализация аргументов
    arguments[x] = arguments[x] || new Date;
    arguments[x] = Date.parse(arguments[x]);
    if ( isNaN(arguments[x]) ) arguments[x] = new Date;
  }
  // Заполняем поля экземпляра класса 
  this.dateFrom = arguments[1];
  this.dateTo = arguments[0];
  this.difference = diff = (this.dateFrom - this.dateTo) / 1000; /*/ Разница в секундах */
  this.string = "";

  while (++step < this._dividers.length) {
    nowRes = diff - (diff % this._dividers[step]) ) / this.dividers[step];/*///*/
    this[ this._keys[step] ] = nowRes//.toFixed(0)
    diff = diff % this._dividers[step]; 
    if (nowRes  !== "0") this.string += nowRes.toFixed(0) + this.pickWord(nowRes, this._words[step]);
  };
}

DateDiff.prototype = {
  constructor: DateDiff,
  
  _dividers: [ 31622400, 2635200, 86400, 3600, 60, 1], // Количество секунд в годе, месяце, дне, часе, минуте и... секунде. Ну надо так.
  _words: [ 
    [" лет ",     " год ",     " года "],
    [" месяцев ", " месяц ",   " месяца "],
    [" дней ",    " день ",    " дня "],
    [" часов ",   " час ",     " часа "],
    [" минут ",   " минута ",  " минуты "],
    [" секунд",   " секунда",  " секунды"]
  ],
  _keys: "years, months, days, hours, minutes, seconds".split(", "),
  
  pickWord: function ( num, wordFor0, wordFor1, wordFor2) {
    /* Проверка и нормализация аргументов */
    if (wordFor0 instanceof Array) {
      if (arguments.length < 2) return "";
      wordFor1 = wordFor0[1];
      wordFor2 = wordFor0[2];
      wordFor0 = wordFor0[0];
    } else if (arguments.length < 4) {
      return ""
    }
    num %= 100;
    
    if ( isNaN(num) || (num >= 5 && num <= 20) || !(num %= 10) || num >= 5 ) {
      return wordFor0
    }
    if (num === 1) return wordFor1;
    return wordFor2
  },
  
  toString: function() {
    return this.string
  }
}

gc.dir( new DateDiff("2010/01/07", "2013/01/07") )