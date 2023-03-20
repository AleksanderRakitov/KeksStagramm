import { isEscEvent } from './function.js';

const COMMENTS_RENDER_STEP = 5;

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const socialComment = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const cancelBigPicture = bigPicture.querySelector('.big-picture__cancel');
const socialComments = bigPicture.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentFragment = document.createDocumentFragment();

let loadComments = [];

let commentCount = COMMENTS_RENDER_STEP;

const onBigPhotoEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onBigPhotoEscKeydown);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  cancelBigPicture.removeEventListener('click', closeBigPicture);
  socialComments.innerHTML = '';
  document.removeEventListener('keydown', onBigPhotoEscKeydown);
  commentCount = COMMENTS_RENDER_STEP;
  loadComments = [];
};

const renderComment = (comment) => {
  const commentElement = commentTemplate.cloneNode(true);

  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;

  return commentElement;
};

const renderComments = (comments) => {

  const onCommentsLoaderClick = () => {
    renderComments(comments);
  }

  commentCount = (comments.length < COMMENTS_RENDER_STEP) ? comments.length : commentCount;
  loadComments = comments.slice(0, commentCount);

  socialComments.innerHTML = '';

  socialComment.textContent = `${loadComments.length} из ${comments.length} комментариев`;

  loadComments.forEach(comment => commentFragment.appendChild(renderComment(comment)));

  socialComments.appendChild(commentFragment);

  if (comments.length > COMMENTS_RENDER_STEP && loadComments.length < comments.length) {
    commentsLoader.classList.remove('hidden');
    commentsLoader.addEventListener('click', onCommentsLoaderClick, { once: true });
  } else {
    commentsLoader.classList.add('hidden');
  }

  commentCount += COMMENTS_RENDER_STEP;
};

const openBigPhoto = (picture) => {
  commentCount = COMMENTS_RENDER_STEP;
  loadComments = [];
  openBigPicture();
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  renderComments(picture.comments.slice());

  cancelBigPicture.addEventListener('click', closeBigPicture);
};

export { openBigPhoto, openBigPicture,  closeBigPicture};
