let base = { 

	__structure: {
		meetings: {
			id: {type: "auto"},
			human: {type: "link", from: "one", to: "many", toTable: "humans", byField: "id"},
			training: {type: "link", from: "one", to: "one", toTable: "training", byField: "id"}
		}
	},

	humans: [
		{id: 0, name: Ann, age: 19},
		{id: 1, name: Peter, age: 21}	
	],
	
	trainings: [
		{id: 0, title: "Sell all"},
		{id: 1, title: "Buy all"}
	],
	
	meetings: [
		{ id: 0, human: [1, 0], training: 0 }
	]

};

class relDB {
	constructor(base) {
		this.base = Object.assign({ }, base);
		this.__structure = this.base.__structure;
		this.__setLinks(this.base);
		
	}
	
	__setLinks( ) {
		
	}
}