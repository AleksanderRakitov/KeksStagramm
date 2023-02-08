import {photos} from './data.js';
import {openBigPhoto} from './test.js'

const pictureTemplateFragment = document.querySelector('#picture').content.querySelector('.picture');
const pictureFragment = document.createDocumentFragment();
const pictureContainer = document.querySelector('.pictures');

const showPhotos = () => {
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

// const renderPhoto = ({url, likes, comments }) => {
//   const pictureElement = pictureTemplate.cloneNode(true);

//   pictureElement.querySelector('.picture__img').src = url;
//   pictureElement.querySelector('.picture__likes').textContent = likes;
//   pictureElement.querySelector('.picture__comments').textContent = comments.length;

//   return pictureElement;
// };

// const renderPhotos = () => {
//   photos.forEach((photo) => {
//     pictureFragment.appendChild(renderPhoto(photo));
//   });
//   pictureBox.appendChild(pictureFragment);
// };

/*const renderPhotos = () => {
  newPictures.forEach(({url, likes, comments }) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureFragment.appendChild(pictureElement);
  });
  pictureBox.appendChild(pictureFragment);
};*/


//export {renderPhotos};
