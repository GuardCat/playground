function calculator(label1, label2) { // Всё поместим в функциию (НЕ ПСЕВДОКЛАСС!), чтобы не захламлять глобальную область видимости.
	var 
		x, inputs = document.querySelectorAll("table.price input"),
		label1Fix = 3, label2Fix = 2 //Сколько цифр оставлять после запятой для кг. и р. соответственно. 
		// Данные из поля ввода округляются по умолчанию по label1Fix, т.е. до 3 цифр после запятой.
	;
	function summAll(){ // Суммирует все нужные столбцы. Нужные столбцы указаны в конце этой функции руками.
		var 
			table = document.querySelector("table.price"),
			inputs = document.querySelectorAll("table.price input"), inputsValues = [],
			x, 
			totalTds = document.querySelectorAll("table.price tr.total td") // все ячейки итоговой строки
		;
		for (x = 0; x < inputs.length; x++) { //соберём в массив все значения пойманых input
			inputsValues.push(parseFloat(inputs[x].value) || 0);
		}
		/*
			Суммирует массив.
		*/
		function arraySumm (arr) {
			var result = 0, x;
			for (x = 0; x < arr.length; x++) {
				result += +arr[x];
			}
			return result;
		}
		/*
			Суммирует указанный столбец в указанной таблице. 
			Может пропустить заголовок и/или последнюю строку,
			если третим (заголовок) и/или четвёртым (последняя строка
			аргументом будет true (отсчёт от единицы).
		*/
		function columnSumm(table, num, passCaption, passTotal, txt, nums){ 
			var 
				rows = table.querySelectorAll("tr"), columns, x,
				startRow = passCaption ? 1 : 0,
				endRowCorrector = passTotal ? 1 : 0,
				result = 0
			;
			for (x = startRow; x < rows.length - endRowCorrector; x++) {
				result += parseFloat(rows[x].querySelectorAll("td")[num].innerText) || 0;
			}
			return result.toFixed(nums) + txt;
		}
		totalTds[2].innerText = columnSumm(table, 5, true, true, label1, 3); // Вот тут руками и указываем что считать и куда писать сумму
		totalTds[3].innerText = columnSumm(table, 6, true, true, label2, 2); // totalTds[3], это считая, что первая ячейка последней строки занимает 3 колонки
		totalTds[1].innerText = arraySumm(inputsValues);
	}
	function forInputOnkeypress () { // это мы пришьём к каждому input'u на нажатие кнопки
		var
			I = +parseFloat(this.value).toFixed(label1Fix), // Тут, перед расчётами, округлили то, что ввёл пользователь. Вместо label1Fix поставьте 0, если клиент может приобретать только целое число товаров.
			pre = this.parentNode.previousSibling.innerText,
			prePre = this.parentNode.previousSibling.previousSibling.innerText,
			next = this.parentNode.nextSibling.innerText,
			nextNext = this.parentNode.nextSibling.nextSibling.innerText
		;
		this.parentNode.nextSibling.innerText = (parseFloat(prePre) * I || 0).toFixed(label1Fix) + label1;
		this.parentNode.nextSibling.nextSibling.innerText = (parseFloat(pre) * I || 0).toFixed(label2Fix) + label2;
		summAll();
	}
	for (x = 0; x < inputs.length; x++) { // Приделываем события к input'ам
		inputs[x].onkeyup = forInputOnkeypress;
	}
}