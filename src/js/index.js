import { refs } from './refs';
import { PixabayApi } from './pixabayAPI';
import { createGallery } from './createMarkup';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix';

const options = {
  root: null,
  rootMargin: '200px',
  threshold: 1.0,
};
const callback = function (entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log(entry.target);
      pixabayApi.incrementPage();
      pixabayApi.getPhotos().then(data => {
        createGallery(data);
        observer.observe(refs.guard);
      });
    }
  });
};
const observer = new IntersectionObserver(callback, options);

refs.form.addEventListener('submit', onSearch);
export const pixabayApi = new PixabayApi();

function onSearch(event) {
  event.preventDefault();
  const searchQuery = event.currentTarget.searchQuery.value;
  if (!searchQuery) {
    Notify.info('Enter data to search, please!');
    return;
  }

  refs.list.innerHTML = '';
  pixabayApi.resetPage();
  pixabayApi.query = searchQuery;
  pixabayApi
    .getPhotos()
    .then(data => {
      createGallery(data);

      //   const item = document.querySelector('.gallery__item:last-child');
      observer.observe(refs.guard);

      if (data.totalHits === 0) {
        Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
    })
    .catch(error => console.log(error));
  refs.form.reset();
}
