"use strict";

let numberOfFilms = prompt('Сколько фильмов вы уже посмотрели?', 0);
console.log(numberOfFilms);

let personalMovieDB = {
	count: numberOfFilms,
	movies: {},
	actors: {},
	genres: [],
	private: false,
};

let movies = {
	lastWatchedFilm: '',
	grade: '',
};
for(let i = 0; i < 2; i++) {
	const lastWatchedFilm = prompt('Один из последних просмотренных фильмов?', '');
	const grade = +prompt('На сколько оцените его?', '');
	personalMovieDB.movies[lastWatchedFilm] = grade;
}

console.log(personalMovieDB);