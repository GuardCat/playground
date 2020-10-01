/* jshint esversion: 8, esnext: false */
async function aForEach(arr, fn, step) {
	const tick = (arr, fn, point = 0, step = 1, resolve) => {
		for (let i = 0; i < step && point < arr.length; i++) {
			fn(arr[point], point, arr);
			point++
		}
		if (point >= arr.length) resolve(true);
		setTimeout( ( ) => tick(arr, fn, point, step, resolve), 0);
	}
	
	return new Promise(
		(resolve, reject) => {
			tick(arr, fn, 0, step, resolve, reject);
		}
	);
}

let a = [ ];
for (let x = 0; x < 10000; x++) {
	a.push({a: x});
}

aForEach(a, (el, i, arr) => el.a++, 10000).then(alert);
alert(2);