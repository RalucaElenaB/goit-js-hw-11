import axios from 'axios';
import { Notify } from 'notiflix';
import displayGallery from './images-gallery';

const limit = 40;
const API_KEY = '39742941-a3fcd4115c851aa67b4f581d5';
const loadMoreButton = document.querySelector('.load-more');
const pageUpButton = document.querySelector('.up-button');

export default async function getImages(queryInput, pageNumber = 1) {
  const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${queryInput}&image_type=photo&per_page=${limit}&orientation=horizontal&safesearch=true&page=${pageNumber}`;

  try {
    const response = await axios.get(URL);
    let images = response.data;
    if (response.data.hits.length === 0) {
      Notify.warning(
        `Sorry, there are no images matching your search query: ${queryInput}. Please try again.`
      );
      hideButton(pageUpButton);
      hideButton(loadMoreButton);
      return;
    }
    displayGallery(images);
    if (pageNumber > 1 && Math.ceil(images.totalHits / limit)) {
      Notify.success(`Hooray! We found ${images.totalHits} images.`);
    }

    showButton(loadMoreButton);
    showButton(pageUpButton);
    if (Math.floor(images.totalHits / limit) + 1 <= pageNumber) {
      hideButton(loadMoreButton);
      Notify.warning(
        `We're sorry, but you've reached the end of search results.`
      );
    }
  } catch (error) {
    Notify.failure('Oops, that request did not work, try another search.');
  }
}

const hideButton = element => element.classList.add('hidden');
const showButton = element => element.classList.remove('hidden');
pageUpButton.addEventListener('click', event => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
