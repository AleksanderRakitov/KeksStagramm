import {showPhotos} from './thumbnail.js';
import {showErrorMessage} from './message.js';
import { shuffleArray, debounce } from './function.js';
import { request } from './fetch.js';

const imgFilters = document.querySelector('.img-filters');

const DEFAULT_PHOTOS_LOAD = 25;
const RANDOM_PHOTOS_LOAD = 10;

let photos = [];

const deleteActiveFilter = () => {
  let activeFilter = document.querySelector('.img-filters__button--active');
  activeFilter.classList.remove('img-filters__button--active');
}

const deletePhotos = () => {
  const images = document.querySelectorAll('.picture');
  if (images) {
    images.forEach(element => {
      element.remove();
    });
  }
}

const filters = {
  'filter-default': () => showPhotos(photos.slice(0, DEFAULT_PHOTOS_LOAD)),
  'filter-random': () => showPhotos(shuffleArray(photos.slice(0, RANDOM_PHOTOS_LOAD))),
  'filter-discussed': () => {
    showPhotos(photos.slice().sort((a, b) => {
      return b.comments.length - a.comments.length;
    }))
  },
}

const onSuccess = (data) => {
  imgFilters.classList.remove('img-filters--inactive');
  photos = data.slice();
  showPhotos(photos.slice(0, DEFAULT_PHOTOS_LOAD));
}

const onError = () => {
  showErrorMessage('Ошибка загрузки, попробуйте еще раз', 'Закрыть')
}

request(onSuccess, onError, 'GET');

const onFilterClick = debounce((evt) => {
  if (evt.target.classList.contains('img-filters__button')) {
    deleteActiveFilter();
    deletePhotos();
    evt.target.classList.add('img-filters__button--active');
    filters[evt.target.id]();
  }
});

imgFilters.addEventListener('click', onFilterClick);
