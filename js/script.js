window.addEventListener('DOMContentLoaded', function () {
  const tabs = document.querySelectorAll('.tabheader__item');
  const tabsContent = document.querySelectorAll('.tabcontent');
  const tabsParent = document.querySelector('.tabheader__items');


  /* TABS */
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

  //Modal

  const modalTriggers = document.querySelectorAll('[data-modal]');
  const modal = document.querySelector('.modal');
  // const modalCloseBtn = document.querySelector('[data-close]');

  const openModal = () => {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
  }

  const closeModal = () => {
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
  }

  const modalTimerId = setTimeout(openModal, 50000);

  const showmodalByScroll = () => {
    if ((window.pageYOffset + document.documentElement.clientHeight) >= (document.documentElement.scrollHeight - 1)) {
      openModal();
      window.removeEventListener('scroll', showmodalByScroll);
    }
  }

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  // modalCloseBtn.addEventListener('click', closeModal);

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


  //Классы для карточек
  class MenuCard {
    constructor(src, alt, title, description, price, parentSelector, ...classes) {
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

  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    `Меню “Фитнес”`,
    `Меню “Фитнес” - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
    9,
    ".menu .container",
  ).render();

  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    `Меню “Премиум”`,
    `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`,
    14,
    ".menu .container",
  ).render();

  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    `Меню “Постное”`,
    `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.`,
    21,
    ".menu .container",
  ).render();


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

      const object = {};
      formData.forEach((elem, index) => {
        object[index] = elem;
      });

      postData('sever.php', JSON.stringify(object))
        .then(data => data.text())
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
    openModal();

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
      closeModal();
    }, 4000);
  }

  fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(res => console.log(res));
});








































































































































