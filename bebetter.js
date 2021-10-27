class Better {
	constructor(days = [ ]) {
		this.lsKey = "beBetterDays";
		const lsData = localStorage[this.lsKey] ? JSON.parse( localStorage[this.lsKey] ) : [ ];
		this.days = [ ...days, ...lsData];
		this.types = ["good", "bad", "unknown"];
		window.addEventListener( "beforeunload", this.save.bind(this) );
	}
	add(day) {
		if (day instanceof Array) return day.map( el => this.add(el) );
		const checkReport = this.check(day);
		if ( !checkReport.good ) return checkReport;
		this.days.push(day);
	}

	toggle(day) {
		const indexNow = this.types.findIndex(day.type);
		let indexNext = indexNow >= this.types.length - 1 ? 0 : indexNow + 1; 
		day.type = this.types[indexNext];
	}

	fix(day) {
		day.fixed = true;
	}

	save( ) {
		window.localStorage[this.lsKey] = JSON.stringify(this.days);
	}

	check(day) {
		const 
			template = {date: new Date(), type: this.types, fixed: false},
			keys = Object.keys(template),
			dkeys = Object.keys(day)
		;
		let report = {date: "not checked", type: "not checked", fixed: "not checked", object: "not checked", good: true};

		if ( !(day instanceof Object) || keys.length !== dkeys.length || !( dkeys.every( el => keys.indexOf(el) !== -1 ) ) ) {
			report.object = "wrong object";
			report.good = false;
			return report;
		}
		report.object = "good";

		if ( !(day.date instanceof Date) ) {
			report.date = "bad";
			report.good = false;
			return report;
		}
		report.date = "good";

		if ( day.type.indexOf(day.type) === -1 ) {
			report.type = "unknown type";
			report.good = false;
			return report;
		}
		report.type = "good";

		if ( !(day.fixed === !!day.fixed ) ) {
			report.fixed = "bad fixed state";
			report.good = false;
			return report;
		}
		report.fixed = "good";

		return report
	}
}