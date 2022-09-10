"use strict";

const person = {
	name: "Sergey",
	age: 19,
	clothes: {
		top: 'sweater',
		bottom: 'shorts'
	}
};

for(let key in person) {
	if(typeof (person[key]) === 'object') {
		for(let i in person[key]) {
			console.log(`Key: ${i} || Value: ${person[key][i]}`);

		}
	} else {
		console.log(`Key: ${key} || Value: ${person[key]}`);
	}
}

console.log(Object.keys(person).length);

const {
	top,
	bottom
} = person.clothes;

console.log(top);