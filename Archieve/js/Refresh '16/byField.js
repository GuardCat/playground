var base = [
	{name: 'Митя', age: 10, sex: 'm'},
	{name: 'Маша', age: 21, sex: 'f'},
	{name: 'Олег', age: 35, sex: 'm'}
]

function byField(field) {
	return function(a, b) {
		return a[field] < b[field] ? 1 : -1;
	}
}

base.sort( byField('name') );

base.forEach( (item) => gc.dir(item) );