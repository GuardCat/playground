var annuitet = (
	function() {
		function calculateProcents(sum, months, proc) {
			var
				monthSum = sum / months,
				monthProc = sum * (proc / 12),
				result = monthSum + monthProc
			;
			sum -= monthSum;
			months--;
			
			if(months) return result + calculateProcents(sum, months, proc);
			return result;
		}
		
		return function(sum, months, proc, joinArgument) {
		
			var 
				errorMsg = "Ошибка в аргументах",
				result = overpay = payment = 0
			;

			joinArgument = joinArgument || "\n";
			sum = +sum;
			proc = parseInt(proc) / 100;

			if (isNaN(sum) || isNaN(proc) || !months) {
				return {
					total: errorMsg,
					overpay: errorMsg,
					payment: errorMsg,
					report: errorMsg
				}
			}
			result = calculateProcents(sum, months, proc).toFixed(2); 
			overpay = (result - sum).toFixed(2);
			payment = (result / months).toFixed(2);
			
			return {
					total: result,
					overpay: overpay,
					payment: payment,
					report: [
						"Сумма: " +  sum + ", срок: " + months + " мес., " +  "ставка годовых: " + (proc * 100) + "%",
						"Необходимо выплатить: " + result,
						"Переплата общая: " + overpay,
						"Платёж: " + payment
					].join(joinArgument)
				} 
		}
	}
)();

annuitet(450000, 60, 20, "<br>").report;