import {openBigPhoto} from './bigPicture.js'

const pictureTemplateFragment = document.querySelector('#picture').content.querySelector('.picture');
const pictureFragment = document.createDocumentFragment();
const pictureContainer = document.querySelector('.pictures');

const showPhotos = (photos) => {
  photos.forEach((picture) => {
    const pictureElement = pictureTemplateFragment.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    pictureElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPhoto(picture);
    });
    pictureFragment.appendChild(pictureElement);
  });

  pictureContainer.appendChild(pictureFragment);
};

export { showPhotos };
