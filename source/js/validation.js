import { isEscEvent } from './function.js';

const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAGS = 5;

const inputHashtag = document.querySelector('.text__hashtags');
const inputComment = document.querySelector('.text__description');

inputHashtag.addEventListener('input', () => {
  inputHashtag.setCustomValidity('');

  let inputHashtagSymbols = inputHashtag.value.toLowerCase().trim();

  if (!inputHashtagSymbols) {
    return;
  }

  let inputHashtagArray = inputHashtagSymbols.split(/\s+/);

  if (inputHashtagArray.length === 0) {
    return;
  }

  const isStartNotHashtag = inputHashtagArray.some((item) => item[0] !== '#');
  if (isStartNotHashtag) {
    inputHashtag.setCustomValidity('Хэштег начинается с символа #');
  }

  const isOnlyLatticeHashtag = inputHashtagArray.some((item) => item === '#');
  if (isOnlyLatticeHashtag) {
    inputHashtag.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
  }

  const isSplitSpaceHashtag = inputHashtagArray.some((item) => item.indexOf('#', 1) >= 1);
  if (isSplitSpaceHashtag) {
    inputHashtag.setCustomValidity('хэш-теги разделяются пробелами');
  }

  const isRepeatingHashtag = inputHashtagArray.some((item, i , arr) => arr.indexOf(item, i + 1) >= i + 1);
  if (isRepeatingHashtag) {
    inputHashtag.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
  }

  const isLongHashtag = inputHashtagArray.some((item) => item.length > MAX_HASHTAG_LENGTH);
  if (isLongHashtag) {
    inputHashtag.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
  }

  if (inputHashtagArray.length > MAX_HASHTAGS) {
    inputHashtag.setCustomValidity('нельзя указать больше пяти хэш-тегов');
  }

  inputHashtag.reportValidity();
});

const onEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
  }
};

inputHashtag.addEventListener('keydown', onEscKeydown);
inputComment.addEventListener('keydown', onEscKeydown);
