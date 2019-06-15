function isSimple(num) {
	var x, maxNumForTest; 
	num = parseFloat(num);
	if(isNaN(num) || (num !== Math.floor(num)) || num <= 1) return false;
	if(num <= 3) return true;
	maxNumForTest = Math.sqrt(num).toFixed(0); 
	for(x = 2; x < maxNumForTest; x++) {
		if(num % x === 0) return false;
	}
	return true;
}

function testFormula() {
 	var x, formula = "Math.pow(x, 2) + x + 41", simple, formulaValue, notAllSimple = false;
	for(x = 0; x <= 40; x++) {
		formulaValue = eval(formula);
		simple = isSimple(formulaValue);
		document.write("x = " + x + "; x<sup>2</sup> + x + 41 = " + formulaValue + "; Простое: " + simple + "<br>");	
		if(!simple) notAllSimple = true;
	}
	if(notAllSimple) {
		alert("Есть составные числа.");
	} else {
		alert("Получены только простые числа.");
	}
}