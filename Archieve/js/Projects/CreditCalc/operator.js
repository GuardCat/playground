//Оператор расчёта
document.getElementById("go").onclick = (
	function() {
		var 
		  term = document.getElementsByName("term")[0],
		  rate = document.getElementsByName("rate")[0],
		  sum = document.getElementsByName('sum')[0],
		  firstPayment = document.getElementsByName("firstPayment")[0],
		  report = document.getElementById("report"),
		  yearsReg = /\d+\s*(лет|год)/,
		  monthsReg = /\d+\s*(мес|месяц)/,
		  txt // Временная переменная для хранения текста из поля срока
		;
		
		sum.onblur = firstPayment.onblur = sum.onchange = firstPayment.onchange = function() {
		  checkNumbers.call(this);
		  groupThis.call(this);
		}
		
		sum.onfocus = firstPayment.onfocus = function() {
		  var txt = this.value.replace(/\s+/g,"");
		  this.value = txt;
	 }
		
		term.onchange = rate.onchange = function() {
		  checkNumbers.call(this);
		}
		
		return function()  {
			var 
				proc = ( firstPayment.value.replace( /\s/g, "" ).substr( firstPayment.value.length - 1, 1 ) === "%" ), result,
				type = getChecked(document.getElementsByName("paymentType"))[0].value,
				fP = parseFloat( firstPayment.value.replace( /\s/g, "" ) ),
				textReport = "",
				summ = parseFloat(sum.value.replace(/\s/g, ""))
			;
			
			//Нормализация полей
			txt = term.value = term.value.replace( /,\d{0,}|\.\d{0,}/g, "" );
			if ( yearsReg.test( term.value ) )  {
				term.value = parseFloat( term.value.match( yearsReg )[0] ) * 12;
				if ( monthsReg.test( txt ) ) {
					txt = parseInt( txt.match( monthsReg )[0] )
				} else {
					txt = "0";
				}
				term.value = +term.value + parseInt(txt);
			}
			term.value = term.value.replace (/\D+/g, "");
			rate.value = rate.value.replace(/,/g, ".");
			sum.value = sum.value.replace(/,/g, ".");
			
			//Нормализация первого платежа
			if( isNaN( fP ) ) fP = 0;
			fP = proc ? summ * ( fP / 100 ) : fP;

			//Если данные некорректны, тормозим расчёты
			if ( !checkNumbers( document.getElementsByClassName( "needCheck" ) ) || !checkNumbers( document.getElementsByClassName( "wrong" ) ) ) {
				report.innerHTML = "<p>В отмеченных полях обязательно должны быть цифры. Исправьте, пожалуйста, иначе расчёт сделать не получится.</p>";
				return false;
			}
			
			result = calculateCredit[type]( (summ - fP), term.value, rate.value );
			textReport += "<table class = 'reportTable'><tr>";
			textReport += "<td class = 'l'>Срок кредита: </td><td>" + years( term.value ) + "</td><tr>";
			textReport += "<td class = 'l'>Сумма кредита: </td><td>" + (summ - fP) + (fP > 0 ? " (первоначальный взнос: " + fP.toFixed(2) + ")</td><tr>" : "</td><tr>");
			textReport += "<td class = 'l'>Придётся переплатить за весь срок: </td><td>" + result.overpay + " (" + ( ( result.overpay / summ ) * 100 ).toFixed( 2 )  + "%)</td><tr>";
			textReport += "<td class = 'l'>Всего нужно отдать: </td><td>" + result.total + "</td><tr>";
			textReport += "</table>";
			textReport += "<h3>Платежи</h3>";
			textReport += "<div class = column>" + ((type !== "annuitet") ? "<p class = 'paymentsGroup'>1 год</p>" : "");

			for(x = 0; x < result.payments.length; x++) {
			  if(type === "annuitet") {
				textReport += "<p class = 'payment'>" + result.payments[x] + " X " + term.value + "</p>";
				break
			  }
			  textReport += "<nobr><p class = 'payment'>" + ( x + 1 ) + ") " + result.payments[x];
			  textReport += "</p></nobr>";
			  if( ( x + 1 ) % 12 === 0 && x !== result.payments.length - 1) textReport += "</div><div class = 'column'><p class = 'paymentsGroup'>" + ( ( ( x + 1 ) / 12 ) + 1 ) + " год</p>";
			}
			textReport += "</div>";
			textReport = textReport.replace(/NaN/g, "?");
			textReport = groupNums(textReport);
			report.innerHTML = textReport;
		}
	}
)()