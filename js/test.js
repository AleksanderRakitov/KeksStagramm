import { isEscEvent } from './function.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const socialComment = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const cancelBigPicture = bigPicture.querySelector('.big-picture__cancel');
const socialComments = bigPicture.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentFragment = document.createDocumentFragment();

const onBigPhotoEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  socialComment.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onBigPhotoEscKeydown);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  socialComment.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  body.classList.remove('modal-open');
  socialComments.innerHTML = '';
  document.removeEventListener('keydown', onBigPhotoEscKeydown);
};

const renderComment = (comments) => {
  const commentElement = commentTemplate.cloneNode(true);

  comments.forEach((comment) => {
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    commentFragment.appendChild(commentElement);
  });

  socialComments.appendChild(commentFragment);

  return commentElement;
};

const openBigPhoto = (picture) => {
  openBigPicture();
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  renderComment(picture.comments);

  cancelBigPicture.addEventListener('click', closeBigPicture);
};

// const bigPicture = document.querySelector('.big-picture');
// const socialComments = bigPicture.querySelector('.social__comments');
// const socialComment = bigPicture.querySelector('.social__comment-count');
// const commentsLoader = bigPicture.querySelector('.comments-loader');
// const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
// const body = document.querySelector('body');
// const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
// const commentFragment = document.createDocumentFragment();


// const openBigPicture = () => {
//   bigPicture.classList.remove('hidden');
//   socialComment.classList.add('hidden');
//   commentsLoader.classList.add('hidden');
//   body.classList.add('modal-open');
// };

// const closeBigPicture = () => {
//   bigPicture.classList.add('hidden');
//   socialComment.classList.remove('hidden');
//   commentsLoader.classList.remove('hidden');
//   body.classList.remove('modal-open');
//   socialComments.innerHTML = '';
// };

// const renderComment = (comments) => {
//   comments.forEach((comment) => {
//     const commentElement = commentTemplate.cloneNode(true);
//     commentElement.querySelector('.social__picture').src = comment.avatar;
//     commentElement.querySelector('.social__picture').alt = comment.name;
//     commentElement.querySelector('.social__text').textContent = comment.message;

//     commentFragment.appendChild(commentElement);
//   });
//   socialComments.appendChild(commentFragment);

//   return socialComments;
// };

// const openBigPhoto = (picture) => {
//   openBigPicture();
//   bigPicture.querySelector('.big-picture__img img').src = picture.url;
//   bigPicture.querySelector('.likes-count').textContent = picture.likes;
//   bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
//   bigPicture.querySelector('.social__caption').textContent = picture.description;
//   renderComment(picture.comments);

//   bigPictureCloseButton.addEventListener('click', closeBigPicture);

//   body.addEventListener('keydown', (evt) => {
//     if (isEscEvent(evt)) {
//       bigPicture.classList.add('hidden');
//       socialComment.classList.remove('hidden');
//       commentsLoader.classList.remove('hidden');
//       body.classList.remove('modal-open');
//       socialComments.innerHTML = '';
//     }
//   })
// };

export { openBigPhoto };
