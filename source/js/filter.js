import { isEscEvent } from './function.js';
import { sliderContainer, lastClass } from './effect.js';
import {showErrorMessage, showSuccessMessage} from './message.js';
import {request} from './fetch.js';

const Scale = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const body = document.querySelector('body');
const upLoadForm = document.querySelector('.img-upload__form');
const inputLoad = upLoadForm.querySelector('#upload-file');
const imgUpLoad = upLoadForm.querySelector('.img-upload__overlay');
const closeUpLoad = upLoadForm.querySelector('#upload-cancel');

//Открытие формы редактирования изображения
const onPopupEscKeydown = (evt) => {
  if(isEscEvent(evt)) {
    closeLoadPicture();
  }
};

const openLoadPicture = () => {
  resetSettings();
  body.classList.add('modal-open');
  imgUpLoad.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscKeydown);
};

const closeLoadPicture = () => {
  body.classList.remove('modal-open');
  imgUpLoad.classList.add('hidden');
  inputLoad.value = '';

  document.removeEventListener('keydown', onPopupEscKeydown);
};

inputLoad.addEventListener('change', () => {
  openLoadPicture();
});

closeUpLoad.addEventListener('click', () => {
  closeLoadPicture();
});

//Редактирования масштаба изображения
const buttonUp = upLoadForm.querySelector('.scale__control--bigger');
const buttonDown = upLoadForm.querySelector('.scale__control--smaller');
const sizeValue = upLoadForm.querySelector('.scale__control--value');
const imgPreview = upLoadForm.querySelector('.img-upload__preview img');
const textHashtags = upLoadForm.querySelector('.text__hashtags');
const textDescription = upLoadForm.querySelector('.text__description');

const resetSettings = () => {
  sizeValue.value = '100%';
  imgPreview.style.transform = 'scale(1.00)';
  imgPreview.style.filter = '';
  textHashtags.value = '';
  textDescription.value = '';
  if (lastClass) {
    imgPreview.classList.remove(lastClass);
  }
  sliderContainer.classList.add('visually-hidden');
};

const resizeImg = (scale) => {
  sizeValue.value = scale +  '%';
  scale /= 100;
  imgPreview.style.transform = 'scale(' + scale + ')';
};

buttonDown.addEventListener('click', () => {
  let imgScale = parseInt(sizeValue.value, 10) - Scale.STEP;

  if (imgScale <= Scale.MIN) {
    imgScale = Scale.MIN;
  }
  resizeImg(imgScale);
});

buttonUp.addEventListener('click', () => {
  let imgScale = parseInt(sizeValue.value, 10) + Scale.STEP;

  if (imgScale >= Scale.MAX) {
    imgScale = Scale.MAX;
  }
  resizeImg(imgScale);
});

const onSuccess = () => {
  showSuccessMessage();
  closeLoadPicture();
  upLoadForm.reset();
}

const onError = () => {
  showErrorMessage('Ошибка загрузки файла', 'Загрузить другой файл');
}

upLoadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  request(onSuccess, onError, 'POST', new FormData(evt.target));
});

// Подставляем изображение пользователя в форму
export {closeLoadPicture, openLoadPicture};
