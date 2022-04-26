'use strict'

// function User(name, id) {
//     this.name = name;
//     this.id = id;
//     this.human = true;
//     this.hello = function () {
//         console.log(`Hello ${this.name}`);
//     }
// }

// const ivan = new User('Ivan', 31);
// const alex = new User('Aleks', 30);
// console.log(ivan);
// console.log(alex);

// function sayName(surname) {
//     console.log(this);
//     console.log(this.name + surname);
// }

// const user = {
//     name: 'John'
// };

// sayName.call(user, 'Smith');
// sayName.apply(user, ['Smith ']);

// class Rectangle {
// 	constructor(height, width) {
// 		this.height = height;
// 		this.width = width;
// 	}

// 	calcArea() {
// 		return this.height * this.width;
// 	}
// }

// const square = new Rectangle(10, 10);
// console.log(square.calcArea());

// const urlObj = {
//     protocol: 'https',
//     domain: 'mysite.com'
// }
 
// function showCurrentURL() {
//     const extractCurrDomain = () => {
//         return this.domain;
//     }
//     const extractCurrProtocol = () => {
//         return this.protocol;
//     }
 
//     console.log(`${extractCurrProtocol()}://${extractCurrDomain()}`)
// }
 
// const url = showCurrentURL.bind(urlObj);
 
// console.log(url());

// console.log('Запрос данных...');

// const req = new Promise(function (resolve, reject) {
//     setTimeout(() => {
//         console.log('Подготовка данных...');

//         const product = {
//             name: 'TV',
//             price: 4000
//         };

//         resolve(product);
//     }, 2000);
// }).then((product) => {
//      return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             product.status = 'order';

//             resolve(product);
//         }, 2000);
//      });
//  }).then((data) => {
//      data.modify = true;
//      return data;
//  }).then(data => {
//      console.log(data);
//  });

// const test = time => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve();
//         }, time);
//     });
// };

// test(1000).then((result) => {
//     console.log('1000 sec');
// }).catch((err) => {
    
// });
// test(2000).then((result) => {
//     console.log('2000 sec');
// }).catch((err) => {
    
// });

// Promise.all([test(1000), test(2000)]).then(() => {
//     console.log('All');
// });
// Promise.race([test(1000), test(2000)]).then(() => {
//     console.log('Race');
// });


// // FILTER
// const names = ['Ivan', 'Ann', 'Ksenia', 'Voldemort'];
// const shortNames = names.filter(name => name.length <= 5);
// console.log('filter -',shortNames);
// // MAP
// const answers = ['IvAn', 'AnN', 'KsenIa', 'VoldemoRt'];
// const answReady = answers.map(item => item.toLocaleLowerCase());
// console.log('map -',answReady);
// // EVERY/SOME
// // REDUCE
// const numArr = [1, 2, -3, -4, 6, 9, -11];
// const reduceResult = numArr.reduce((res, current) => res + current, 0);

// const obj = {
//     ivan: 'person',
//     anna: 'person',
//     dog: 'animal',
//     cat: 'animal'
// };

// const newArr = Object.entries(obj) //преобразование объекта в массив массивов
//     .filter(item => item[1] === 'person') //запуск "по цепочке" - чейнинг
//     .map(item => item[0]);
// console.log('newArr :>> ', newArr);

const films = [
    {
        name: 'Titanic',
        rating: 9
    },
    {
        name: 'Die hard 5',
        rating: 5
    },
    {
        name: 'Matrix',
        rating: 8
    },
    {
        name: 'Some bad film',
        rating: 4
    }
];

function showGoodFilms(arr) {
    return arr.filter(item => item.rating >= 8);
}

function showListOfFilms(arr) {
    return arr.reduce((res, current) => {`${res}, ${current.name}`})
    return res;
}

function setFilmsIds(arr) {

}

console.log('showGoodFilms :>> ', showGoodFilms(films));
console.log('showListOfFilms :>> ', showListOfFilms(films));