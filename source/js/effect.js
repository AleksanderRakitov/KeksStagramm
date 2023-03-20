/* global noUiSlider:readonly */

//Обьявляем переменные
const imgPreview = document.querySelector('.img-upload__preview img');
const effectContainer = document.querySelector('.img-upload__effects');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
const slaider = document.querySelector('.effect-level__slider');

sliderContainer.classList.add('visually-hidden');

let lastClass = '';
//создаем обьект с методами для отображения эффектов
const effects = {
  none: () => {
    sliderContainer.classList.add('visually-hidden');
    return 'none';
  },
  chrome: () => {
    sliderContainer.classList.remove('visually-hidden');
    return `grayscale(${parseInt(effectLevelValue, 10) * 0.01})`;
  },
  sepia: () => {
    sliderContainer.classList.remove('visually-hidden');
    return `sepia(${parseInt(effectLevelValue, 10) * 0.01})`;
  },
  marvin: () => {
    sliderContainer.classList.remove('visually-hidden');
    return `invert(${Math.floor(effectLevelValue, 10)}%)`;
  },
  phobos: () => {
    sliderContainer.classList.remove('visually-hidden');
    return `blur(${parseInt(effectLevelValue, 10) * 0.03}%)`;
  },
  heat: () => {
    sliderContainer.classList.remove('visually-hidden');
    return `brightness(${parseInt(effectLevelValue, 10) * 0.03})`;
  },
};

const onRadioGroupClick = (evt) => {
  if(evt.target.classList.contains('effects__preview')) {
    if(lastClass !== '') {
      imgPreview.classList.remove(lastClass);
    }
    slaider.noUiSlider.set(100);
    let currentClass = evt.target.classList[1];
    lastClass = currentClass;
    imgPreview.classList.add(currentClass);
    // sliderContainer.classList.remove('visually-hidden'); уже есть в методе объкта effects
    imgPreview.getElementsByClassName.filter = effects[currentClass.replace('effects__preview--', '')]();
  }
};

//создаем обработчик для переключения между радиокнопками
effectContainer.addEventListener('click', onRadioGroupClick);

//слайдер

noUiSlider.create(slaider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 0.1,
  connect: 'lower',
});

slaider.noUiSlider.on('change', () => {
  effectLevelValue.value = slaider.noUiSlider.get();
  imgPreview.style.filter = effects[lastClass.replace('effects__preview--', '')]();
});

export {sliderContainer, lastClass};
