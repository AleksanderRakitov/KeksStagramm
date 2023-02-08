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

//Генерация случайных, непвторяющихся чисел из диапазона
// const makeUniqueRandomNumber = (min, max) => {
//   const previesValues = [];

//   return () => {
//     let currentValue = getRundomNumber(min, max);

//     if (previesValues.length >= (max - min + 1)) {
//       throw new Error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
//     }

//     while (previesValues.includes(currentValue)) {
//       currentValue = getRundomNumber(min, max);
//     }

//     previesValues.push(currentValue);

//     return currentValue;
//   };
// };

// const makeUniqueCount = () => {
//   const newArr = [];
//   for (let i = 0; i < 25; i++) {
//     const currentValue = makeUniqueRandomNumber(0,25);

//     if (!newArr.includes(currentValue)) {
//       newArr.push(currentValue);
//     };
//   };

//   return newArr;
// };

export { getRundomNumber, getMaxLine, getRandomArrayIndex, isEscEvent, isEnterEvent };
