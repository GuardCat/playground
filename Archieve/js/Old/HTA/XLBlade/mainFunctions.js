gid("fileName").onchange = function () {
	var captions;
	gid("go").disabled = false;
	gid("column").disabled = false;
	try {
		if(excel.activeWorkbook) excel.activeWorkbook.close();
		excel.workbooks.open(gid("fileName").value);
		gid("info").style.display = "none";
	} catch(e) {
		makeToast("Ошибка при открытии файла: " + e.name + ": " + e.message, "!");
		gid("fileName").value = "";
		return false;
	}
	makeToast("Выбран файл «" + excel.activeWorkbook.path + "\\" + excel.activeWorkbook.name + "».");
	captions = getCaptions();
	if (!captions) {
		makeToast("Нет заголовков в указанном файле. Работа невозможна.", "!");
		gid("go").disabled = true;
		gid("column").disabled = true;
	} else {
		injectSelect(gid("column"), captions);
	}
	
}
gid("go").onclick = function () {
	cutIt();
}
function cutIt () {
	var name, column, path, t, proc,   r =/[\/\:\?\*\<\>\&"]/g,
		labels = [], x = 2, nowRow, rowsForInsert = {}, iRow,
		time, timeExpense, needTime, oneRowTime, timeResult = "вычисляется..."
	;
	gid("info").style.display = "block";
	mainName = excel.activeWorkbook.name;
	path = excel.activeWorkbook.path;
	column  = excel.activeWorkbook.activeSheet.columns(+gid("column").value);
	iRow = excel.activeWorkbook.activeSheet.usedRange.row + excel.activeWorkbook.activeSheet.usedRange.rows.count - 1;
	var circle = function () {
		nowRow = column.Rows(x);
		name = String(nowRow.Formula).replace(r,"'") + (gid("oldFormat").checked ? ".xls" : ".xlsx");
		if(!nowRow.Formula){ // Если попалось пустое значение метки
			clearInterval(t);
			for (x in rowsForInsert) {
				excel.workbooks(x).save(); // Сохранить все книги
				excel.workbooks(x).close();// Закрыть все книги
			}
			makeToast("Завершено. Затрачено времени: " + msToNorm(Date.parse(Date()) - time));

			gid("info").innerHTML = "Завершено.";
			return false // Закончить цикл
		}
		if (!labels.check(nowRow.Formula)) { // Найдена новая метка
			labels.push(nowRow.Formula);
			rowsForInsert[name] = 2;
			if (x === 2) makeToast("Старт нарезки. Строк: " + iRow + ". Поле для нарезки: «" + column.rows(1).formula + "»") ;
			makeToast("Найдена метка: «" + nowRow.Formula +"». Всего найдено меток: " + labels.length, "i");
			excel.workbooks.add();
			if (gid("oldFormat").checked) {
				excel.activeWorkbook.SaveAs(path + "\\" + name, -4143);
			} else {
				excel.activeWorkbook.saveAs(path + "\\" + name);
			}
			copyRow(1);	//Скопировать заголовок в основной книге
			pasteRow(name, 1); //Вставить заголовок во вновь созданную книгу
			copyRow(x); //Скопировать текущую строку в основной книге
			pasteRow(name, rowsForInsert[name]);//Вставить текущую строку во вновь созданную книгу
			rowsForInsert[name]++;
		} else {
			copyRow(x);
			pasteRow(name, rowsForInsert[name]);
			rowsForInsert[name]++;
		}
		proc = ((x / iRow) * 100).toFixed(0);
		if(x >= iRow - 2) {
			gid("info").innerHTML = "Обработка закончена. Подождите сохранения данных.";
		} else {
			gid("info").innerHTML = "Обработано строк: " + x +" из " + iRow + " — " + proc + "%. " + "Осталось подождать: " + timeResult;
		}
		if ((x / iRow) * 100 > 5 && x % 20 === 0) {
			timeExpense = Date.parse(Date()) - time;
			oneRowTime = timeExpense / x;
			needTime = oneRowTime * (iRow - x);
			timeResult = msToNorm(needTime);
		}
		x++;
	}
	time = Date.parse(Date());
	t = setInterval(circle, 1);
}