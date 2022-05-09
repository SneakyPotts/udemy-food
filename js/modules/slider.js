function slider({
                  container,
                  slide,
                  prevArrow,
                  nextArrow,
                  totalCounter,
                  currentCounter,
                  wrapper,
                  field
                }) {
  const slides = document.querySelectorAll(slide);
  const slider = document.querySelector(container);
  const prev = document.querySelector(prevArrow);
  const next = document.querySelector(nextArrow);
  const total = document.querySelector(totalCounter);
  const current = document.querySelector(currentCounter);
  const slidesWrapper = document.querySelector(wrapper);
  const slidesField = document.querySelector(field);
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

export default slider;