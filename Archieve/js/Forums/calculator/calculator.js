function calculator(label1, label2) { // �� �������� � �������� (�� �����������!), ����� �� ���������� ���������� ������� ���������.
	var 
		x, inputs = document.querySelectorAll("table.price input"),
		label1Fix = 3, label2Fix = 2 //������� ���� ��������� ����� ������� ��� ��. � �. ��������������. 
		// ������ �� ���� ����� ����������� �� ��������� �� label1Fix, �.�. �� 3 ���� ����� �������.
	;
	function summAll(){ // ��������� ��� ������ �������. ������ ������� ������� � ����� ���� ������� ������.
		var 
			table = document.querySelector("table.price"),
			inputs = document.querySelectorAll("table.price input"), inputsValues = [],
			x, 
			totalTds = document.querySelectorAll("table.price tr.total td") // ��� ������ �������� ������
		;
		for (x = 0; x < inputs.length; x++) { //������ � ������ ��� �������� �������� input
			inputsValues.push(parseFloat(inputs[x].value) || 0);
		}
		/*
			��������� ������.
		*/
		function arraySumm (arr) {
			var result = 0, x;
			for (x = 0; x < arr.length; x++) {
				result += +arr[x];
			}
			return result;
		}
		/*
			��������� ��������� ������� � ��������� �������. 
			����� ���������� ��������� �/��� ��������� ������,
			���� ������ (���������) �/��� �������� (��������� ������
			���������� ����� true (������ �� �������).
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
		totalTds[2].innerText = columnSumm(table, 5, true, true, label1, 3); // ��� ��� ������ � ��������� ��� ������� � ���� ������ �����
		totalTds[3].innerText = columnSumm(table, 6, true, true, label2, 2); // totalTds[3], ��� ������, ��� ������ ������ ��������� ������ �������� 3 �������
		totalTds[1].innerText = arraySumm(inputsValues);
	}
	function forInputOnkeypress () { // ��� �� ������� � ������� input'u �� ������� ������
		var
			I = +parseFloat(this.value).toFixed(label1Fix), // ���, ����� ���������, ��������� ��, ��� ��� ������������. ������ label1Fix ��������� 0, ���� ������ ����� ����������� ������ ����� ����� �������.
			pre = this.parentNode.previousSibling.innerText,
			prePre = this.parentNode.previousSibling.previousSibling.innerText,
			next = this.parentNode.nextSibling.innerText,
			nextNext = this.parentNode.nextSibling.nextSibling.innerText
		;
		this.parentNode.nextSibling.innerText = (parseFloat(prePre) * I || 0).toFixed(label1Fix) + label1;
		this.parentNode.nextSibling.nextSibling.innerText = (parseFloat(pre) * I || 0).toFixed(label2Fix) + label2;
		summAll();
	}
	for (x = 0; x < inputs.length; x++) { // ����������� ������� � input'��
		inputs[x].onkeyup = forInputOnkeypress;
	}
}