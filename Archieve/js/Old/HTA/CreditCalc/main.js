//Вспомогательное
var 
	groupNums = (
	  function() {
		var r = /(\d{3})/g;
		return function(text) {
		  text = String(text);
		  return text.split("").reverse().join("").replace(r, "$1 ").split("").reverse().join("");
		}
	  }
	)(),
	helpString = "\
Просто заполните поля и нажмите большую кнопку «Расчёт».\n\
Для печати результатов, кликните изображение принтера или нажмите Ctrl+P (английская буква).\
\n\n\
Горячие клавиши: \n\
	Esc: 			закрыть программу,\n\
	Enter: 			рассчитать,\n\
	Ctrl+P: 			напечатать расчёты,\n\
	Ctrl+колёсико мыши:	масштаб, \n\
	F5: 			Очистить платежи, \n\
	F1: 			Эта справка\
"
;

function groupThis(e) {
  var start = this.selectionStart, end = this.selectionEnd;
  e = e || window.event;
  this.value = this.value.replace(/\s/g, "");
  this.value = groupNums(this.value);
}

function arrows(e) {
	var target;
	e = e || window.event;
	if(e.keyCode === 40 && this.parentNode.nextSibling)	target = this.parentNode.nextSibling.getElementsByTagName("input")[0];
	if(e.keyCode === 38 && this.parentNode.previousSibling)	target = this.parentNode.previousSibling.getElementsByTagName("input")[0];
	if(target) target.focus();
}

document.getElementsByName('sum')[0].onkeydown 				= arrows;
document.getElementsByName('term')[0].onkeydown 			= arrows;
document.getElementsByName('rate')[0].onkeydown 			= arrows;
document.getElementsByName('firstPayment')[0].onkeydown 	= arrows;

function yearWord(num) { //Возвращает верную форму слова год, соответствующую нужной цифре
	var nNum;
	num = new String(num);
	if(!num.length) return (" лет");
	if (num.length > 2) {
		num = num.substr(num.length - 2, 2);
	}
	nNum = +num;
	if ( ( nNum > 4 && nNum < 21 ) || ( +num.substr(1,1) > 4 ) ) return " лет";
	if ( nNum === 1 || ( num.substr(1,1) === "1" ) ) return " год";
	if ( num.substr( 1,1 ) === "0" ) return " лет";
	return " года";	
}

function years(months) {//Пересчитыват месяца в годах и месяцах
	var m = Math.floor( months / 12 )
	return (months < 12) ?
		months + " мес." :
		( 
			m + yearWord( m ) + ( 
				( months % 12 ) ?
					"  и " + months % 12 + " мес." :
					""
			)
		)
	;
}

if(!document.getElementsByClassName) { 
	document.getElementsByClassName = (
		function(){
			var elements = document.getElementsByTagName("*");
			return function(queryTxt) {
				var 
					result = [ ], 
					y,  result = [ ]
				;
				for(y = 0; y < elements.length; y++) {
					if(elements[y].className === queryTxt) result.push(elements[y]);
				}
				return result;
			}
		}
	)()
}

function getChecked(elements) {
	var x, result = [ ];
	for(x = 0; x < elements.length; x++) {
		if (elements[x].checked) result.push(elements[x]);
	}
	return result;
}

function checkNumbers(inputs) {
  var x, result = true;
  inputs = inputs || [this];
  for(x = 0; x < inputs.length; x++) {
    if( isNaN( parseFloat( inputs[x].value ) ) || inputs[x].value === "") {
      if ( !inputs[x].getAttribute( "data-oldClass" ) ) {
        inputs[x].setAttribute("data-oldClass", inputs[x].className);
      }
      inputs[x].className = "wrong";
      result = false;
      
    } else {
      if ( inputs[x].getAttribute( "data-oldClass" ) ) {
		inputs[x].className = inputs[x].getAttribute( "data-oldClass" );
	  }
    }
  }
  return result;
}

document.onkeydown = function(e) {
	e = e || window.event;
	switch(e.keyCode) {
		case 13:
			document.getElementById("go").onclick();
			break;
		case 27:
			close();
			break;
		case 112:
			alert(helpString);
	}
}

// косметические средства
document.title += " v" + sc.version;
window.resizeTo(864, screen.height - 50);
window.moveTo(screen.width / 2 - 864 / 2, 5);