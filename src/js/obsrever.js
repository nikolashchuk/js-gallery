import { PixabayApi } from './pixabayAPI';
import { createGallery } from './createMarkup';

const options = {
  root: null,
  rootMargin: '100px',
  threshold: 1.0,
};
const callback = function (entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log(entry.target);
    }
  });
};
const observer = new IntersectionObserver(callback, options);
