"use strict";

window.addEventListener('DOMContentLoaded', () => {

	const tabsParent = document.querySelector('.tabheader__items'),
		tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent');

	function hideTabContent() {
		tabsContent.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});

		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active');
		});
	};

	function showTabContent(i = 0) {
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');
	};

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener('click', (event) => {
		const target = event.target;

		if(target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if(target == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});

	//Timer
	const deadline = '2022-10-01';

	function endOfSale(endtime) {
		const total = Date.parse(endtime) - Date.parse(new Date()),
			days = Math.floor(total / (1000 * 60 * 60 * 24)),
			hours = Math.floor((total / (1000 * 60 * 60)) % 24) + (new Date().getTimezoneOffset()) / 60,
			minutes = Math.floor((total / (1000 * 60)) % 60),
			seconds = Math.floor((total / 1000) % 60);

		return {
			total,
			days,
			hours,
			minutes,
			seconds
		};
	}

	function getZero(num) {
		if(num >= 0 && num < 10) {
			return `0${num}`;
		}
		return num;
	}

	function setClock(selector, endtime) {
		const timerBlock = document.querySelector(selector),
			timerInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = endOfSale(endtime);

			timerBlock.querySelector('#days').textContent = getZero(t.days);
			timerBlock.querySelector('#hours').textContent = getZero(t.hours);
			timerBlock.querySelector('#minutes').textContent = getZero(t.minutes);
			timerBlock.querySelector('#seconds').textContent = getZero(t.seconds);


			if(t.total <= 0) {
				clearInterval(timerInterval);
			}
		}
	}

	setClock('.timer', deadline);

	//Modal

	const btnOpen = document.querySelectorAll('[data-modal]'),
		btnClose = document.querySelector('[data-close]'),
		modalWindow = document.querySelector('.modal');
	let checkModal = false;
	btnOpen.forEach(btn => {
		btn.addEventListener('click', openModalWindow);
	});
	btnClose.addEventListener('click', closeModalWindow);

	modalWindow.addEventListener('click', (event) => {
		if(event.target === modalWindow) {
			closeModalWindow();
		}
	});

	function openModalWindow() {
		modalWindow.style.display = "block";
		document.body.style.overflow = "hidden";
		checkModal = true;
		clearInterval(openingModalTimer);
	}

	function closeModalWindow() {
		modalWindow.style.display = "none";
		document.body.style.overflow = "";
		checkModal = false;
	}

	document.addEventListener('keydown', (event) => {
		if(event.key === "Escape" && checkModal) {
			closeModalWindow();
		}
	});

	const openingModalTimer = setTimeout(openModalWindow, 10000);

	let isInd = false;

	function scrollToEnd() {
		if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight/* && !isInd*/) {
			openModalWindow();
			// isInd = true;
			window.removeEventListener('scroll', scrollToEnd);
		}
	}

	window.addEventListener('scroll', scrollToEnd);

	//Menu
	const menuList = document.querySelector('.menu__field');

	// document.querySelector('.menu__field').innerHTML = " ";

	class MenuCard {
		constructor(src, alt, title, descr, price, parentSelector) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.desc = descr;
			this.price = price;
			this.parent = document.querySelector(parentSelector);
		}

		render() {
			const card = document.createElement('div');
			card.innerHTML = `<div class="menu__item">
		        <img src=${this.src} alt=${this.alt}>
		        <h3 class="menu__item-subtitle">${this.title}</h3>
		        <div class="menu__item-descr">${this.title} - ${this.desc}
		        </div>
		        <div class="menu__item-divider"></div>
		        <div class="menu__item-price">
		            <div class="menu__item-cost">Цена:</div>
		            <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
		        </div>
		    </div>`;

			this.parent.append(card);
		}
	}

	new MenuCard(
		"img/tabs/vegy.jpg",
		"vegy",
		'Меню "Фитнес"',
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		9,
		".menu .container"
	).render();

	new MenuCard(
		"img/tabs/post.jpg",
		"post",
		'Меню "Постное"',
		'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
		14,
		".menu .container"
	).render();

	new MenuCard(
		"img/tabs/elite.jpg",
		"elite",
		'Меню “Премиум”',
		'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
		21,
		".menu .container"
	).render();


	//Forms request
	const forms = document.querySelectorAll('form');
	const messages = {
		loading: "Loading ... ",
		success: "We will, we will call you back",
		failure: "Something went wrong ... "
	};

	forms.forEach(item => {
		sendData(item);
	});

	function sendData(form) {
		form.addEventListener('submit', (event) => {
			event.preventDefault();

			const statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			statusMessage.textContent = messages.loading;
			form.append(statusMessage);

			const formData = new FormData(form);
			const data = {};
			formData.forEach(function(value, key) {
				data[key] = value;
			});

			fetch("server.php", {
				method: "GET",
				headers: {
					'Content-type': 'application/json'
				},
				body: formData
			})
				.then(data => data.json())
				.then(data => {
					console.log(request.response);
					statusMessage.textContent = messages.success;
				}).catch(() => {
				statusMessage.textContent = messages.failure;
			}).finally(() => {
				form.reset();
				setTimeout(() => {
					statusMessage.remove();
				}, 2000);
			});

			request.send(JSON.stringify(data));

		});
	}
});


