gid("fileName").onchange = function () {
	var captions;
	gid("go").disabled = false;
	gid("column").disabled = false;
	try {
		if(excel.activeWorkbook) {
			excel.activeWorkbook.close();
		}
		excel.workbooks.open(gid("fileName").value);
		iRow = excel.activeWorkbook.activeSheet.usedRange.row + excel.activeWorkbook.activeSheet.usedRange.rows.count - 1;
		iColumn = excel.activeWorkbook.activeSheet.usedRange.column + excel.activeWorkbook.activeSheet.usedRange.columns.count - 1;
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
};
gid("go").onclick = function () {
	excel.displayAlerts = false;
	excel.activeWorkbook.activeSheet.Sort.SortFields.Clear();
    excel.activeWorkbook.activeSheet.Sort.SortFields.Add(excel.range(excel.activeWorkbook.ActiveSheet.columns(+gid("column").value).rows(1).address));
    with (excel.activeWorkbook.activeSheet.Sort){
        setRange(excel.range("A2:" + excel.activeWorkbook.activeSheet.columns(iColumn).rows(iRow).address));
        header = 2;
        matchCase = false;
        orientation = 1;
        SortMethod = 1;
        apply();
    }
	gid("info").style.display = "block";
	cutIt();
};

function cutIt () {
	var 
		name, column, path, label, labelCount, r =/[\/\:\?\*<\>\&"]/g,
		nowRowObj, nowRowNum = 2, time, timer
	;
	mainName	= excel.activeWorkbook.name;
	path		= excel.activeWorkbook.path;
	column		= excel.activeWorkbook.activeSheet.columns(+gid("column").value);
	makeToast("Старт нарезки. Строк: " + iRow + ". Поле для нарезки: «" + column.rows(1).formula + "»");
	time = Date.parse(Date());
	function stopIt(){
		clearInterval(timer);
		makeToast("Завершено. Затрачено времени: " + msToNorm(Date.parse(Date()) - time));
		gid("info").innerHTML = "Завершено: 100%";
	}
	function circle() {
		nowRowObj	= column.Rows(nowRowNum);
		label		= column.rows(nowRowNum).value;
		labelCount	= excel.countIf(column, label);
		if (!label || label === "undefined") {
			stopIt();
			return;
		}
		makeToast("Создаём файл для «" + label + "»", "i");
		name = String(nowRowObj.Formula).replace(r,"'") + (gid("oldFormat").checked ? ".xls" : ".xlsx");
		excel.workbooks.add();
		if (gid("oldFormat").checked) {
			excel.activeWorkbook.SaveAs(path + "\\" + name, 56);//-4143);
		} else {
			excel.activeWorkbook.saveAs(path + "\\" + name);
		}
		copyRow(1);
		pasteRow(name, 1);
		copyRows(nowRowNum, nowRowNum + labelCount - 1);
		pasteRow(name, 2);
		nowRowNum += labelCount;
		excel.workbooks(name).save();
		excel.workbooks(name).close();
		gid("info").innerHTML = "Завершено: " + parseInt(nowRowNum / iRow * 100) + "%";
		if (nowRowNum >= iRow){
			stopIt();
		}
	}
	timer = setInterval (circle, 1);
}