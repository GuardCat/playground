/**
  Функция getPassedTime рассчитывает разницу между введённой
  и текущей датой. Выражает в годах, днях и месяцах.
  
  @param date дата Date, от нее до сегодня будем считать
  @return строка с расчетами

*/

getPassedTime = ( function () {
  var
    nowDate = new Date( ),
    words = [
      [365.25, ["год", "года",  "лет"]],
      [30, ["месяц", "месяца", "месяцев"]],
      [1, ["день", "дня", "дней"]]
    ],
    getRightWord = function( num, wordsArr ) { // Возвращает слово, соответствующее цифре по окончанию
      var decNum = num % 10;
      if (num >= 100) num = num % 100;
      if (num < 21 && num >= 5) return wordsArr[2];
      if (decNum >= 5) return wordsArr[2]
      if (decNum > 1 && decNum < 5) return wordsArr[1];
      return wordsArr[0]
    }
  ;
  return function (date) {
    var 
      x, difference, 
      result = "", 
      days = (nowDate - date) / 1000 / 60 / 60 / 24 // Разница в днях
    ;
    for (x = 0; x < words.length; x++) {
      if (days >= words[x][0]) {
        difference = days;
        days = days % words[x][0];
        difference = (difference - days) / words[x][0];
        result += (result ? " " : "") + parseInt(difference) + " " + getRightWord( difference, words[x][1] )
      }
    }
    return result
  }
} ) ()

//Пример
alert(getPassedTime(new Date("2002/11/26")))
