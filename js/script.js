/* Задание на урок:

1) У нас уже есть рабочее приложение, состоящее из отдельных функций. Представьте, что
перед вами стоит задача переписать его так, чтобы все функции стали методами объекта personalMovieDB
Такое случается в реальных продуктах при смене технологий или подхода к архитектуре программы

2) Создать метод toggleVisibleMyDB, который при вызове будет проверять свойство privat. Если оно false - он
переключает его в true, если true - переключает в false. Протестировать вместе с showMyDB.

3) В методе writeYourGenres запретить пользователю нажать кнопку "отмена" или оставлять пустую строку.
Если он это сделал - возвращать его к этому же вопросу. После того, как все жанры введены -
при помощи метода forEach вывести в консоль сообщения в таком виде:
"Любимый жанр #(номер по порядку, начиная с 1) - это (название из массива)"*/

"use strict";

let personalMovieDB = {
	count: 0,
	movies: {},
	actors: {},
	genres: [],
	private: false,
	start: function() {
		personalMovieDB.count = +prompt('Сколько фильмов вы уже посмотрели?', '');
		while(personalMovieDB.count == '' || personalMovieDB.count == null || isNaN(personalMovieDB.count)) {
			personalMovieDB.count = +prompt('Сколько фильмов вы уже посмотрели?', '');
		}
	},
	rememberMyFilms: function() {
		for(let i = 0; i < 2; i++) {
			let checkFirstQ = true;
			let checkSecondQ = true;
			let lastWatchedFilm;
			let grade;

			while(checkFirstQ) {
				lastWatchedFilm = prompt('Один из последних просмотренных фильмов?', '');
				if(lastWatchedFilm != null && lastWatchedFilm != '' && lastWatchedFilm.length <= 50) {
					checkFirstQ = false;
				}
			}

			while(checkSecondQ) {
				grade = +prompt('На сколько оцените его?', '');
				if(grade != null && grade != '') {
					checkSecondQ = false;
				}
			}

			personalMovieDB.movies[lastWatchedFilm] = grade;
		}
	},
	detectPersonalLevel: function() {
		if(personalMovieDB['count'] < 10) {
			console.log('Просмотрено довольно мало фильмов');
		} else if(personalMovieDB['count'] >= 10 && personalMovieDB['count'] < 30) {
			console.log('Вы классический зритель');
		} else if(personalMovieDB['count'] >= 30) {
			console.log('Вы киноман');
		} else {
			console.log('Произошла ошибка');
		}
	},
	showMyDB: function(privat) {
		if(!privat) {
			personalMovieDB.start();
		}
	},
	writeYourGenres: function() {
		for(let i = 1; i <= 3; i++) {
			let genre = prompt(`Ваш любимый жанр под номером ${i}`, '');
			if(genre == null || genre === '' || !isNaN(genre)) {
				i--;
			} else {
				personalMovieDB.genres[i - 1] = genre;
			}
		}
		personalMovieDB.genres.forEach(function(item, i) {
			console.log(`Любимый жанр #${i + 1} - это ${item}`);
		})
	},
	toggleVisibleMyDB: function() {
		personalMovieDB.private = personalMovieDB.private ? false : true;
	}
};

// console.log(personalMovieDB.start());
// console.log(personalMovieDB.rememberMyFilms());
console.log(personalMovieDB.writeYourGenres());
console.log(personalMovieDB);

