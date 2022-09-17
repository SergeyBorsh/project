'use strict';

document.addEventListener('DOMContentLoaded', function() {
	const movieDB = {
		movies: [
			"Логан",
			"Лига справедливости",
			"Ла-ла лэнд",
			"Одержимость",
			"Скотт Пилигрим против..."
		]
	};

	//Переменные
	const ad = document.querySelector('.promo__adv');
	const imgs = ad.querySelectorAll('img');
	const promo_bg = document.querySelector('.promo__bg');
	const movieList = document.querySelector('.promo__interactive-list');
	const fav_Movies = document.querySelectorAll('.promo__interactive-item');
	const addForm = document.querySelector('form.add');
	const addInput = addForm.querySelector('.adding__input');
	const checkBox = addForm.querySelector('[type="checkbox"]');

	imgs.forEach(item => {
		item.remove();
	})
	ad.querySelector('.promo__adv-title').remove();

	promo_bg.querySelector('.promo__genre').textContent = "Драма";
	promo_bg.style.cssText = "background: url('../img/bg.jpg') center center/cover no-repeat";

	movieList.innerHTML = "";
	sortMovie(movieDB.movies);

	function sortMovie(arr) {
		movieList.innerHTML = "";
		arr = movieDB.movies.sort();
		arr.forEach(function(film, i) {
			movieList.innerHTML += `<li class="promo__interactive-item">${i + 1}. ${film}<div class="delete" id="${i}"></div></li>`;
		});
	}

	addForm.addEventListener('submit', function(event) {
		event.preventDefault();
		const getInputContent = addInput.value;
		let newMovieArray = null;
		if(getInputContent != '' && getInputContent != null) {
			if(getInputContent.length > 21) {
				const changedInput = getInputContent.substring(0, 20);
				newMovieArray = movieDB.movies.push(`${changedInput}...`);
			} else {
				newMovieArray = movieDB.movies.push(getInputContent);
			}
			if(checkBox.checked) {
				console.log('Добавляем любимый фильм');
			}
			checkBox.checked = false;
			sortMovie(newMovieArray);
			addInput.value = "";
		}
	});

	movieList.addEventListener('click', (event) => {
		if(event.target.classList.contains("delete")) {
			delete movieDB.movies[event.target.id];
			sortMovie(movieDB.movies);
		}
	});

});