function replaceDoubledSymbols(str) {
	var
		newStr, arr = str.split(";"),
		maxLength, arrayForReplace = [ ],
		one, two
	;
	
	if(arr.length !== 2) return "Ошибка. Вы ввели неверное количество символов «;». Перезагрузите. страницу и попробуйте ещё раз";
	
	if(arr[0].length > arr[1].length) {
		maxLength = arr[0].length;
		one = arr[0];
		two = arr[1];
	} else {
		maxLength = arr[1].length;
		one = arr[1];
		two = arr[0];
	}

	for(x = 0; x < maxLength; x++) {
		if( two.indexOf( one.substr( x, 1 ) ) !== -1) {
			arrayForReplace.push(one.substr(x, 1))
		}
	}

	newStr = str;

	while(arrayForReplace.length) {
		newStr = newStr.split( arrayForReplace.pop() ).join( "" );
	}
	
	return newStr;
}

function print(text) {
	var p = document.createElement("p");
	p.innerHTML = text;
	return document.body.appendChild(p);
}

var 
	str = prompt("Введите две строки символов, разделённые знаком «;»"),
	newStr = replaceDoubledSymbols(str)
;


print("Введены строки: " + str);
print("После удаления символов, встречающихся в обеих строках, получилось: " + newStr)