import { isEscEvent } from './function.js';

const body = document.querySelector('body');
const successTemplateFragment = body.querySelector('#success').content.querySelector('.success');
const successFragment = document.createDocumentFragment();
const errorTemplateFragment = body.querySelector('#error').content.querySelector('.error');
const errorFragment = document.createDocumentFragment();

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    closePopup();
  }
};

const onWindowClick = (evt, selector, type) => {
  let element = document.querySelector(selector);
  if (!element.contains(evt.target)) {
    closePopup(type);
  }
};

const closePopup = (message) => {
  message.remove();

  document.removeEventListener('keydown', onPopupEscKeydown);
  document.removeEventListener('click', onWindowClick.bind);
};

const showSuccessMessage = () => {
  const successMessage = successTemplateFragment.cloneNode(true);
  const btnSuccessClose = successMessage.querySelector('.success__button');
  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      closePopup(successMessage);
    }
  });

  document.addEventListener('click', (evt) => {
    onWindowClick(evt, '.success__inner', successMessage);
  })

  btnSuccessClose.addEventListener('click', () => {
    closePopup(successMessage);
  });

  successFragment.appendChild(successMessage);
  body.appendChild(successFragment);
};

const showErrorMessage = (text, button) => {
  const errorMessage = errorTemplateFragment.cloneNode(true);

  errorMessage.querySelector('.error__title').textContent = text;
  errorMessage.querySelector('.error__button').textContent = button;
  const btnErrorClose = errorMessage.querySelector('.error__button');


  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      closePopup(errorMessage);
    }
  });

  document.addEventListener('click', (evt) => {
    onWindowClick(evt, '.error__inner', errorMessage);
  });

  btnErrorClose.addEventListener('click', () => {
    closePopup(errorMessage);
  });

  errorFragment.appendChild(errorMessage);
  body.appendChild(errorFragment);
};

export {showSuccessMessage, showErrorMessage};
