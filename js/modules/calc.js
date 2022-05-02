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

export default calc;