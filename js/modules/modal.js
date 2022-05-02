export const openModal = (modalSelector) => {
  const modal = document.querySelector(modalSelector);

  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';
  clearInterval(modalTimerId);
}

export const closeModal = (modalSelector) => {
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

export default modal;