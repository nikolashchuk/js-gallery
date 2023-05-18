//https://pixabay.com/api/
import axios from 'axios';

export class PixabayApi {
  #BASE_URL = 'https://pixabay.com';
  #KEY = '33161979-56695e67461a6bb8d382238a0';
  #query = '';
  #page = 1;
  #per_page = 10;
  #totalPhotos = 0;

  async getPhotos() {
    try {
      const response = await axios.get(
        `${this.#BASE_URL}/api/?key=${this.#KEY}&q=${
          this.#query
        }&image_type=photo&orientation=horizontal&safesearch=true&page=${
          this.#page
        }&per_page=${this.#per_page}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  hasMorePhotos() {
    return this.#page > Math.ceil(this.#totalPhotos / this.#per_page);
  }

  setTotalPhotos(totalPhotos) {
    this.#totalPhotos = totalPhotos;
  }

  incrementPage() {
    this.#page += 1;
  }

  resetPage() {
    this.#page = 1;
  }

  get query() {
    return this.#query;
  }

  set query(newQuery) {
    this.#query = newQuery;
  }
}
