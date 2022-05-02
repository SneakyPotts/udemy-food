import { closeModal, openModal } from './modal';

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
}

export default forms;