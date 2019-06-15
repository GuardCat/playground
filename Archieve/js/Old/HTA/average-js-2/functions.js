/* functions.js для average-js-2.hta*/

/*
 	Функция average принимает массив чисел.
 	Возвращает объект result: среднее арифметическое 
 	count: количество элементов массива
 */
function average (arr) {

	var result = {}, x, sum = 0;
	for(x = 0; x < arr.length; x++) {
		sum += arr[x];
	}
	result = {
		result: (sum / arr.length).toFixed(2),
		count: arr.length
	}
	if (isNaN(result.result)){
		result.result = 0;
	}
	return result;
}

function numberize (txt) {
	if(txt == "" || txt == "" || isNaN(+txt)) {
		return ""
	}
	return +txt
}
/*
 	Функция toFormate принимает массив, возвращает
	массив, изменённый в соответствии с правилами форматирования.
	Парсит конструкции типа 100*3, удаляя их и добавляя
	в начало массива n элементов m. n --- число справа от звёздочки,
	m --- число слева от звёздочки.
 */
 function toFormate (arr) {
	var x, y, result = [], execArr, w;
	var r = /\*/g, matches, what, howMuch;
	for(x = 0; x < arr.length; x++) {
		matches = arr[x].match(r);
		if( matches == null || matches.length > 1){
			result.push(arr[x]);
		} else {
			r = /\*/g;
			w = r.exec(arr[x]);
			what = arr[x].substr(0, r.lastIndex - 1);
			howMuch = +(arr[x].substr(r.lastIndex));
			if(!isNaN(howMuch)) {
				for (y = 0; y < howMuch; y++) {
					result.push(what);
				}
			} else {
				result.push(arr[x]);
			}
		}
	}
	return result;
 }
 /*
 	Функция addRow добавляет строку в таблицу.
	Не универсальна. Рассчитана на разметку average-js-2.hta
 */
 function addRow() {
	var td = document.createElement("td"), tr = document.createElement("tr");
	var textarea = document.createElement("textarea");
	td.className = "indicator";
	td.innerHTML = "<div>" + "Введено значений: </div>";
	td.innerHTML += "<div>" + "Среднее арифметическое: </div>";
	tr.appendChild(td);
	td = document.createElement("td");
	sewnToTextarea(textarea);
	td.innerHTML = "<input type = 'text'>";
	td.appendChild(textarea);
	tr.appendChild(td);
	document.getElementById("mainTable").firstChild.appendChild(tr);

 }
function sewnToTextarea(textarea){
 	textarea.onkeypress = forTextareaKeys;
	textarea.onfocus = forTextareaFocus;
	textarea.onblur = forTextareaBlur;
	textarea.ondblclick = forTextareaDblclick;
}
/*
 *	Функция giveReport возвращает текстовый отчёт,
 *	в формате HTML, используя введённые пользователем заголовки полей
 *	и полученные расчётах данные. Информация собирается из DOM.
 *	Функция не принимает аргументов.
 */
function giveReport() {
	var x, trs = document.getElementById("mainTable").getElementsByTagName("tr");
	var result = "<ul type = 'a'>", inputVal, tds, indicators;
	for (x = 0; x < trs.length; x++) {
		tds = trs[x].getElementsByTagName("td");
		inputVal = tds[1].getElementsByTagName("input")[0].value;
		inputVal = inputVal || "Нет заголовка"
		result += "<li>" + inputVal + ": ";
		indicators = tds[0].getElementsByTagName("b");
		if (indicators.length === 0) {
			result += "нет данных для расчёта </li>";
			continue;
		}
		result += indicators[1].innerHTML + " (участников оценили: " + indicators[0].innerHTML +"), </li>";
	}
	result += "</ul>";
	return result;
}
/*
	Функция say создаёт окно сообщения. Принимает заголовок, текст сообщения,
	список надписей на кнопках и возвращаемые ими значения(ассоциативный массив).
*/
function say(capt, txt, buttons) {
	var msgBox = document.getElementById("msg");
	var tds = msgBox.getElementsByTagName("td");
	msgBox.getElementsByTagName("caption")[0].getElementsByTagName("span")[1].innerHTML = capt;
	tds[0].innerHTML = txt;
	tds[1].innerHTML = "";
	msgBox.style.top = screen.availHeight / 2 - 100 + "px";
	msgBox.style.left = "10%";
	msgBox.style.display = "block";
}