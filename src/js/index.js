import { refs } from './refs';
import { PixabayApi } from './pixabayAPI';
import { createGallery } from './createMarkup';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix';
import { spinnerPlay, spinnerStop } from './spinner';

const options = {
  root: null,
  rootMargin: '200px',
  threshold: 1.0,
};
const callback = function (entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      pixabayApi.incrementPage();
      spinnerPlay();
      pixabayApi
        .getPhotos()
        .then(data => {
          createGallery(data);
          observer.observe(refs.guard);
        })
        .finally(() => {
          spinnerStop();
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
  spinnerPlay();

  pixabayApi
    .getPhotos()
    .then(data => {
      createGallery(data);

      observer.observe(refs.guard);

      if (data.totalHits === 0) {
        Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
    })
    .catch(error => console.log(error))
    .finally(() => {
      spinnerStop();
    });
  refs.form.reset();
}

refs.goTopBtn.addEventListener('click', onTop);
window.addEventListener('scroll', trackScroll);

function onTop() {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -25);
    setTimeout(onTop, 0);
  }
}

function trackScroll() {
  const offset = window.pageYOffset;
  const height = document.documentElement.clientHeight;
  if (offset > height) {
    refs.goTopBtn.classList.add('js-scroll-top--show');
  } else {
    refs.goTopBtn.classList.remove('js-scroll-top--show');
  }
}
