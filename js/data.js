import {getRundomNumber, getRandomArrayIndex} from './function.js';

const PHOTO_COUNT = 25;

// енам-объект
const Comments = {
  MIN: 1,
  MAX: 4,
};

const UrlCount = {
  MIN: 1,
  MAX: 6,
};

const Likes = {
  MIN: 15,
  MAX: 200,
};

let photos = [];

const photoDescription = [
  'Старое фото',
  'Мы на прогулке',
  'Из архива',
  'Эксперементальное фото',
  'Моё первое творение',
  'Не судите строго',
  'Позитивное фото',
];

const names = [
  'Александр','Дмитрий','Евгений','Марат','Евсевия','Алексей','Леонид','Виктория','Мария','Владимир','Наталия','Михаил',
];

const textMessage = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

//Генерация комментария к фотографии

const getComments = () => {
  const comments = [];

  for (let i = 0; i < getRundomNumber(Comments.MIN, Comments.MAX); i++) {
    comments.push({
      id: getRundomNumber(1, 200),
      avatar: 'img/avatar-' + getRundomNumber(UrlCount.MIN, UrlCount.MAX) + '.svg',
      message: getRandomArrayIndex(textMessage),
      name: getRandomArrayIndex(names),
    });
  }

  return comments;
};

// Генерация обьектов фотографий в один массив photos

const getPhotos = () => {
  for (let i = 0; i < PHOTO_COUNT; i++) {
    photos.push({
      id: i + 1,
      url: 'photos/' + (i + 1) + '.jpg',
      description: getRandomArrayIndex(photoDescription),
      likes: getRundomNumber(Likes.MIN, Likes.MAX),
      comments: getComments(),
    });
  }
};

getPhotos();

export { photos };
