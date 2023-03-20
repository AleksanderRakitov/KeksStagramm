const TYPES_FILE = ['gif', 'jpg', 'jpeg', 'png'];

const inputLoad = document.querySelector('#upload-file');
const imgPreview = document.querySelector('.img-upload__preview img');
const previews = document.querySelectorAll('.effects__preview');

inputLoad.addEventListener('change', () => {
  const file = inputLoad.files[0];
  const fileName = file.name.toLowerCase();

  const matches = TYPES_FILE.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      imgPreview.src = reader.result;

      previews.forEach((filter) => {
        filter.style.backgroundImage = `url(${reader.result})`;
      });
    });

    reader.readAsDataURL(file);
  }
});
