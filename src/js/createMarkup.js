import { refs } from './refs';
import SimpleLightbox from 'simplelightbox';

export function createGallery({ hits }) {
  const markup = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="gallery__item">
  <div class="photo-card">
    <a  href="${largeImageURL}">
      <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
    <div class="info">
      <p class="info-item">
        <b>Likes: </b>
        ${likes}
      </p>
      <p class="info-item">
        <b>Views: </b>
        ${views}
      </p>
      <p class="info-item">
        <b>Comments: </b>
        ${comments}
      </p>
      <p class="info-item">
        <b>Downloads: </b>
        ${downloads}
      </p>
    </div>
  </div>
</li>`
    )
    .join('');

  refs.list.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: '250',
  scrollZoom: false,
});
