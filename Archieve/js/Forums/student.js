function Student(name, level, id) {
	//Определяем значения по умолчанию.
	//Оптимальнее было бы заложить значения по умолчанию в прототип, но так сложнее будет печатать поля в классе-потомке.
	this.name = name || "no named";
	this.level = level || 1;
	this.id = id || 0;
}

Student.prototype = {
	//Определяем методы, общие для всех экземпляров класса
	show: function() { // Печать полей класса
		var list = [ ], x;
		for(x in this) {
			if(this.hasOwnProperty(x)){
				list.push(x + ": " + this[x]);
			}
		}
		alert(list.join("\n"));
	},
	
	changeId: function (newId){//Функция смены id
		if(newId) this.id = newId;
		return newId
	},
	constructor: Student
};

function SuperStudent(name, level, id, diplom) {
	this.name = name || "no named";
	this.level = level || 1;
	this.id = id || 0;
	this.diplom = diplom || "";
}
SuperStudent.prototype = new Student();
SuperStudent.prototype.theme = "";
SuperStudent.prototype.changeDiplom = function(theme) {
	if(theme) this.diplom = theme;
	return this.diplom;
}

s = new Student("Иванов Сергей Петрович", 2, 123);
s.changeId(124);
s.show();

ss = new SuperStudent("Графинов Армен Викторович", 6, 125, "Методика детектирования взаимосвязи между распилом бюджетных средств и глоабльным потеплением климата");
ss.show();
ss.changeDiplom("Не фиг воровать и проблем с теплом не будет");
ss.show();