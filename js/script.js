/* Задание на урок:

1) Первую часть задания повторить по уроку

2) Создать функцию showMyDB, которая будет проверять свойство privat. Если стоит в позиции
false - выводит в консоль главный объект программы

3) Создать функцию writeYourGenres в которой пользователь будет 3 раза отвечать на вопрос
"Ваш любимый жанр под номером ${номер по порядку}". Каждый ответ записывается в массив данных
genres

P.S. Функции вызывать не обязательно*/

"use strict";

let numberOfFilms;

function start() {
	numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');
}

let personalMovieDB = {
	count: numberOfFilms,
	movies: {},
	actors: {},
	genres: [],
	private: false,
};

function rememberMyFilms() {
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
}

function detectPersonalLevel() {
	if(personalMovieDB['count'] < 10) {
		console.log('Просмотрено довольно мало фильмов');
	} else if(personalMovieDB['count'] >= 10 && personalMovieDB['count'] < 30) {
		console.log('Вы классический зритель');
	} else if(personalMovieDB['count'] >= 30) {
		console.log('Вы киноман');
	} else {
		console.log('Произошла ошибка');
	}
}

console.log(personalMovieDB);

function showMyDB(privat) {
	if(!privat) {
		start();
	}
}

showMyDB(personalMovieDB.private);

function writeYourGenres() {
	for(let i = 1; i <= 3; i++) {
		const genre = prompt(`Ваш любимый жанр под номером ${i}`, '');
		personalMovieDB.genres[i - 1] = genre;
	}
	return personalMovieDB.genres;
}

console.log(writeYourGenres());