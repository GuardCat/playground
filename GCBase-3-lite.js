/*jshint esversion: 6 */
/*jshint browser: true */

"use strict";

let base = {
	students: [
		{ id: 0, FIO: "Ivan",	grade: "III"},
		{ id: 1, FIO: "Maria",	grade: "II"	},
		{ id: 2, FIO: "Petr",	grade: "I"	},
		{ id: 3, FIO: "Anton",	grade: "IV"	},
		{ id: 4, FIO: "Julia",	grade: "V"	}
	],

	trainings: [
		{ id: 0, name: "BME"},
		{ id: 1, name: "Sales"},
		{ id: 2, name: "Defeat"},
		{ id: 3, name: "TM"},
		{ id: 4, name: "Stress"},
		{ id: 5, name: "Eloquent speaker"}
	],

	events: [
		{ id: 0, date: "2019-09-01", theme: 5, students: [2, 3] },
		{ id: 1, date: "2019-08-01", theme: 4, students: [0, 1, 3] },
		{ id: 2, date: "2019-07-01", theme: 2, students: [1, 0] },
		{ id: 3, date: "2019-06-01", theme: 5, students: [0, 3, 2] }
	],

	__relations: [
		{table: "events", field: "students", type: "one-to-many", toTable: "students", byField: "id"},
		{table: "events", field: "theme", type: "one-to-one", toTable: "trainings", byField: "id"}
	]
};

let events, trainings, students, ourTrainingId;

// 1. Получить список тренингов, которые никто не посещал.
// 2. Получить список студентов, посетивших тренинг "Eloquent speaker" дважды
// 3. Получить список студентов с количеством визитов на любые тренинги. Отсортировать по убыванию визитов.
// 4. Получить список всех events с заменой индексов зависимых полей на значения соответствующих записей в других таблицах.

// Exercise 1
events = Object.keys( base.events.reduce( (a, b) => { a[b.theme] = ""; return a; }, { } ) );
trainings = base.trainings.filter( 
	training => !events.some( 
		event => training.id == event 
	) 
);

console.info("Exersice 1: список тренингов, которые никто не посещал");
console.dir(trainings);

// Exercise 2
events = students = trainings = [ ];
ourTrainingId = base.trainings.find( training => training.name.indexOf("speaker") != -1 ).id;
events = base.events.filter( event => event.theme === ourTrainingId );

students = base.students.filter(
	student => events.reduce( 
		(sum, event) => { 
			if ( event.students.some(id => id === student.id) ) sum++; 
			return sum;
		}, 0 
	) === 2
);

console.info("Exersice 2: список студентов, посетивших тренинг 'Eloquent speaker' дважды");
console.dir(students);

// Exercise 3
events = trainings = [ ];
students = Object.assign( [ ], base.students ); // Будем изменять объекты массива, поэтому копируем его.

students.forEach(

	student => {
		student.visits = 0;
		base.events.forEach(
			event => {
				if (event.students.some( id => id === student.id )) student.visits++;
			}
		);
	}
	
);

students.sort( (a, b) => a.visits < b.visits ? 1 : -1 );

console.info("Exersice 3: список студентов с количеством визитов на любые тренинги. Отсортировать по убыванию визитов.");
console.dir(students);
