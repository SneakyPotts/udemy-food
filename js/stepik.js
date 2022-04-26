function my_function(n, res = '') {
	if (n < 1) {
		console.log('finish', res);
		return res;
	} else {
		res = `${n--} ${res}`;
		return my_function(n, res);
	}
}

function my_function2(n) {
	return n == 1
		? n.toString()
		: my_function2(n - 1) + ' ' + n;
}

console.log(my_function2(8));


// function testArray(a, b) {
// 	let sum = 0;
// 	for (elem of b) {
// 		a.push(elem);
// 	}
// 	for (elem of a) {
// 		sum += elem;
// 	}
// 	return sum;
// }

// console.log(testArray([8, 1, 1, 7, 4, 0], [5, 8, 5, 4, 8]));

// function testArray(a, b) {
// 	let res = a.concat(b).split('');
// 	res.unshift('Иванов');
// 	res = res.reverse().join('');

// 	return res;
// }

// console.log(testArray('4326', '297515'));

const checkBrackets = (str) => {
	let stack = [];
	const arrStr = str.split('');

	for (char of arrStr) {
		if (char === '(') {
			stack.push(char);
		} else {
			let lastEl = stack.pop();

			if (!lastEl)
				return false;
		} b
	}
	return stack.length
		? false
		: true;
}

console.log(checkBrackets('(((()))'));


const arr = [1,1,2,3,3,4,5,6,6,7,8,8];

const withoutRepeat = (arr) => {
	let res = [];

	for (item of arr) {
		let count = 0;
		for (elem of arr) {
			if (item === elem) 
				count++;
		}
		if (count === 1) 
			res.push(item);
	}

	return res;
}

console.log(withoutRepeat(arr));