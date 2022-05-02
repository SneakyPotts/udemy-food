/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
  //Калькулятор
  const result = document.querySelector('.calculating__result span');
  let sex = localStorage.getItem('sex') ? localStorage.getItem('sex') : 'female',
    height,
    weight,
    age,
    ratio = localStorage.getItem('ratio') ? localStorage.getItem('ratio') : 1.375;

  localStorage.setItem('sex', sex);
  localStorage.setItem('ratio', ratio);

  let initLocalSettings = function (selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
      elem.classList.remove(activeClass);
      if (elem.id === localStorage.getItem('sex')) {
        elem.classList.add(activeClass);
      }
      if (elem.dataset.ratio === localStorage.getItem('ratio')) {
        elem.classList.add(activeClass);
      }
    });
  }

  let calcTotal = function () {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = '____';
      return;
    }

    if (sex === 'female') {
      result.textContent = `${Math.round(447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age) * ratio)}`;
    } else {
      result.textContent = `${Math.round(88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age) * ratio)}`;
    }
  }

  let getStaticInformation = function (selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
      elem.addEventListener('click', (e) => {
        if (e.target.dataset.ratio) {
          ratio = +e.target.dataset.ratio;
          localStorage.setItem('ratio', ratio);
        } else {
          sex = e.target.id;
          localStorage.setItem('sex', sex);
        }
        console.log(ratio, sex);

        elements.forEach(elem => elem.classList.remove(activeClass));
        e.target.classList.add(activeClass);
        calcTotal();
      });
    });
  }

  let getDynamicInformation = function (selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {

      if (input.value.match(/\D/g)) {
        input.style.border = '1px solid tomato';
      } else {
        input.style.border = 'none';
      }

      switch (input.id) {
        case 'height':
          height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;
      }
      calcTotal();
    });
  }

  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
  getStaticInformation('#gender div', 'calculating__choose-item_active');
  getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
  getDynamicInformation('#height');
  getDynamicInformation('#weight');
  getDynamicInformation('#age');

  calcTotal();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards() {
  //Классы для карточек
  class MenuCard {
    constructor(src, alt, title, description, price, parentSelector = ".menu .container", ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.description = description;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.classes = classes;
      this.transfer = 27;
      this.changetoUAH();
    }

    changetoUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement('div');

      if (this.classes.length === 0) {
        this.elementClassDefault = 'menu__item';
        element.classList.add(this.elementClassDefault);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }

      element.innerHTML = `
					<img src=${this.src} alt=${this.alt}>
					<h3 class="menu__item-subtitle">${this.title}</h3>
					<div class="menu__item-descr">${this.description}</div>
					<div class="menu__item-divider"></div>
					<div class="menu__item-price">
						<div class="menu__item-cost">Цена:</div>
						<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
					</div>
			`;
      this.parent.append(element);
    }
  }

  const getResource = async (url) => {
    const result = await fetch(url);

    if (!result.ok) {
      throw new Error(`Could not fetch ${url}, statusL ${result.status}`);
    }

    return await result.json();
  }

  // getResource('http://localhost:3000/menu')
  //   .then(data => {
  //     data.forEach(({img, altimg, title, descr, price}) => {
  //       new MenuCard(img, altimg, title, descr, price).render();
  //     });
  //   })


  //axios
  axios.get('http://localhost:3000/menu')
    .then(response => {
      response.data.forEach(({img, altimg, title, descr, price}) => {
        new MenuCard(img, altimg, title, descr, price).render();
      });
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");


function forms() {
  //формы
  const forms = document.querySelectorAll('form');
  const mess = {
    loading: 'img/icons/spinner.svg',
    success: 'Спасибо, ты молодец!',
    failure: 'Что-то пошло не так...'
  }

  const postData = async (url, data) => {
    const result = await fetch(url, {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
      },
      body: data,
    });

    return await result.json();
  }

  let bindPostData = function (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = mess.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      form.insertAdjacentElement('afterend', statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData('http://localhost:3000/requests', json)
        .then(data => {
          console.log(data);
          showThanksModal(mess.success);
        })
        .catch(() => {
          showThanksModal(mess.failure);
        })
        .finally(() => {
          form.reset();
          statusMessage.remove();
        });
    });
  }

  forms.forEach(form => bindPostData(form));

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)();

    const thanksModal = document.createElement('div');
    thanksModal.className = 'modal__dialog';
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    document.querySelector('.modal').append(thanksModal);

    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)();
    }, 4000);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
const openModal = (modalSelector) => {
  const modal = document.querySelector(modalSelector);

  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';
  clearInterval(modalTimerId);
}

const closeModal = (modalSelector) => {
  const modal = document.querySelector(modalSelector);

  modal.classList.remove('show');
  modal.classList.add('hide');
  document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector) {
  //Modal
  const modalTriggers = document.querySelectorAll(triggerSelector);
  const modal = document.querySelector(modalSelector);

  const modalTimerId = setTimeout(openModal, 50000);

  const showmodalByScroll = () => {
    if ((window.pageYOffset + document.documentElement.clientHeight) >= (document.documentElement.scrollHeight - 1)) {
      openModal();
      window.removeEventListener('scroll', showmodalByScroll);
    }
  }

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', () => openModal(modalSelector));
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal || event.target.getAttribute('data-close') === '') {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });

  window.addEventListener('scroll', showmodalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider() {
  //Slider
  const slides = document.querySelectorAll('.offer__slide');
  const slider = document.querySelector('.offer__slider');
  const prev = document.querySelector('.offer__slider-prev');
  const next = document.querySelector('.offer__slider-next');
  const total = document.querySelector('#total');
  const current = document.querySelector('#current');
  const slidesWrapper = document.querySelector('.offer__slider-wrapper');
  const slidesField = document.querySelector('.offer__slider-inner');
  const width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1;
  let offset = 0;

  let addZero = function (number, textContainer) {
    number < 10
      ? textContainer.textContent = `0${number}`
      : textContainer.textContent = String(number);
  }

  let replaceText = function (text) {
    return +text.replace(/\D/g, '');
  }

  addZero(slides.length, total);
  addZero(slideIndex, current);

  slidesField.style.cssText = `
    display: flex;
    width: ${100 * slides.length}%;
    transition: all 0.5s;
  `;
  slidesWrapper.style.overflow = 'hidden';

  slides.forEach(slide => {
    slide.style.width = width;
  })

  slider.style.position = 'relative';

  const dots = [];
  const indicators = document.createElement('ol');
  indicators.className = 'carousel-indicators';
  slider.insertAdjacentElement('beforeend', indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.className = 'dot';
    dot.setAttribute('data-slide-to', String(i + 1));

    if (i === 0)
      dot.style.opacity = String(1);

    indicators.insertAdjacentElement('beforeend', dot);
    dots.push(dot);
  }

  next.addEventListener('click', () => {
    offset === replaceText(width) * (slides.length - 1)
      ? offset = 0
      : offset += replaceText(width);

    slidesField.style.transform = `translateX(-${offset}px)`;

    slideIndex === slides.length
      ? slideIndex = 1
      : slideIndex++;

    addZero(slideIndex, current);

    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = '1';
  });

  prev.addEventListener('click', () => {
    offset === 0
      ? offset = replaceText(width) * (slides.length - 1)
      : offset -= replaceText(width);

    slidesField.style.transform = `translateX(-${offset}px)`;

    slideIndex === 1
      ? slideIndex = slides.length
      : slideIndex--;

    addZero(slideIndex, current);

    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = '1';
  });

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.dataset.slideTo;

      slideIndex = slideTo;
      offset = replaceText(width) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      addZero(slideIndex, current);

      dots.forEach(dot => dot.style.opacity = '.5');
      dots[slideIndex - 1].style.opacity = '1';
    });
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs() {
  /* TABS */
  const tabs = document.querySelectorAll('.tabheader__item');
  const tabsContent = document.querySelectorAll('.tabcontent');
  const tabsParent = document.querySelector('.tabheader__items');

  const hideTabContent = function () {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });

    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  };

  const showTabContent = function (index = 0) {
    tabsContent[index].classList.remove('hide');
    tabsContent[index].classList.add('show', 'fade');
    tabs[index].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', function (event) {
    const target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, index) => {
        if (target == item) {
          hideTabContent();
          showTabContent(index);
        }
      });
    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer() {
  /* TIMER */
  const deadline = '2022-05-11';

  const getTimeRemaining = function (endtime) {
    let days = 0,
      hours = 0,
      minutes = 0,
      seconds = 0;

    const time = Date.parse(endtime) - Date.parse(new Date());

    if (time > 0) {
      days = Math.floor(time / (1000 * 60 * 60 * 24));
      hours = Math.floor((time / (1000 * 60 * 60)) % 24);
      minutes = Math.floor((time / (1000 * 60)) % 60);
      seconds = Math.floor((time / 1000) % 60);
    }

    return {
      'total': time,
      days,
      hours,
      minutes,
      seconds
    }
  }

  const getZero = (num) => {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  const setClock = function (selector, endtime) {
    const timer = document.querySelector(`.${selector}`);
    const days = timer.querySelector('#days');
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');
    const timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.textContent = getZero(t.days);
      hours.textContent = getZero(t.hours);
      minutes.textContent = getZero(t.minutes);
      seconds.textContent = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock('timer', deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");








window.addEventListener('DOMContentLoaded', function () {

  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal');
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])();
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])();
});









































































































































})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map