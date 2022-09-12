/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
	movies: [
		"Логан",
		"Лига справедливости",
		"Ла-ла лэнд",
		"Одержимость",
		"Скотт Пилигрим против..."
	]
};

const ad = document.querySelector('.promo__adv');
const imgs = ad.querySelectorAll('img');
imgs.forEach(item => {
	item.remove();
})
ad.querySelector('.promo__adv-title').remove();

const promo_bg = document.querySelector('.promo__bg');
promo_bg.querySelector('.promo__genre').textContent = "Драма";
promo_bg.style.cssText = "background: url('../img/bg.jpg') center center/cover no-repeat";

const movieList = document.querySelector('.promo__interactive-list');
movieList.innerHTML = "";
const fav_Movies = document.querySelectorAll('.promo__interactive-item');

const sort_arr = movieDB.movies.sort();

sort_arr.forEach(function(film, i) {
	movieList.innerHTML += `<li class="promo__interactive-item">${i+1}. ${film}<div class="delete"></div></li>`;
});
