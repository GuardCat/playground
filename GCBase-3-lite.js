let base = {
	students: [
		{ id: 0, FIO: "Ivan", grade: "III" },
		{ id: 1, FIO: "Maria", grade: "II" },
		{ id: 2, FIO: "Petr", grade: "I" },
		{ id: 3, FIO: "Anton", grade: "IV" },
		{ id: 4, FIO: "Julia", grade: "V" }
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
		{ id: 0, date: "2019-09-01", theme: 5, students: [2, 4] },
		{ id: 1, date: "2019-08-01", theme: 0, students: [4, 1, 3] },
		{ id: 2, date: "2019-07-01", theme: 2, students: [1, 0] },
		{ id: 3, date: "2019-06-01", theme: 5, students: [0, 3, 2] }
	],
	
	__relations: {	
		events: {field: "students", type: "one-to-many", toTable: "students", byField: "id"},
		events: {field: "students", type: "one-to-one", toTable: "trainings", byField: "id"}
	}
};

// Получить список студентов, которые посетили любой тренинг в сентябре
// Получить список тренингов, которые никто не посетил
// Получить список студентов, посетивших тренинг "Eloquent speaker" дважды
