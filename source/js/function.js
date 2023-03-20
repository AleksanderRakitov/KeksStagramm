// Генерируем случано число
const getRundomNumber = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }
  if (max < min) {
    [min,max] = [max,min];
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Проверяем длину строки
const getMaxLine = (text, maxSymbols) => text.length <= maxSymbols;

// Получаем случайный элемент массива
const getRandomArrayIndex = (element) => element[getRundomNumber(0, element.length -1)];

const isEscEvent = (evt) =>  evt.key === 'Escape' || evt.key === 'Esc';

const isEnterEvent = (evt) => evt.key === 'Enter';

// таймаут запроса
const DEBOUNCE_INTERVAL = 500

const debounce = (cb) => {
  let lastTimeout = null;

  return (...args) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...args);
    }, DEBOUNCE_INTERVAL);
  };
};

// перемешиваем массив
const shuffleArray = (arr) => {
  let j, temp;
  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

export { getRundomNumber, getMaxLine, getRandomArrayIndex, isEscEvent, isEnterEvent, debounce, shuffleArray };
