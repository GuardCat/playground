/*jshint esversion: 6 */
/*jshint browser: true */


let base = {
	students: [
		{ id: 0, fio: "Ivan",	grade: "III"},
		{ id: 1, fio: "Maria",	grade: "II"	},
		{ id: 2, fio: "Petr",	grade: "I"	},
		{ id: 3, fio: "Anton",	grade: "IV"	},
		{ id: 4, fio: "Julia",	grade: "V"	}
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

	__relations: {
		"events": {
			"students":	{from: "many",	to: "one",	toTable: "students",	byField: "id"},
			"theme":	{from: "one",	to: "one",	toTable: "trainings",	byField: "id"}
		}
	}
};

class TinyDB {
	constructor(base) {
	  this.base = base;
	}

	getFromRelation (tableName, fieldName, key)  {
		this.throwIfWrongRelation(tableName, fieldName);
		let many = this.base.__relations[tableName][fieldName].to === "many";

		return this.get(tableName, fieldName, key, many);
	}

	get(tableName, fieldName, key, all = false) {
		if (key instanceof Array) return key.map( i => this.get(tableName, fieldName, i) );
		let fn = all ? "filter" : "find";

		return key instanceof Function ?
			base[tableName][fn]( entry => key(entry) )
		:
			base[tableName][fn]( entry => entry[fieldName] === key )
		;
	}

	throwIfWrongRelation(tableName, fieldName) {
		let base = this.base;
		if ( !(base.__relations && base.__relations[tableName] && base.__relations[tableName][fieldName]) ) {
			throw new Error(`There is not relation's description in base.__relations. Table: ${tableName}, field: ${fieldName}`);
		}
	}
}

let db = new TinyDB(base);
console.dir( db.getFromRelation("events", "theme", 5) );