import getImages from './get-images';
import displayGallery from './images-gallery';
import './css/styles.css';

const form = document.querySelector('.search-form');
const userInput = document.querySelector('input#search-query');
const getNextPageButton = document.querySelector('.load-more');
const searchButton = document.querySelector('button#search-btn');

let pageNum = 1;
const gallery = document.querySelector('.photo');

const handleSubmit = e => {
  e.preventDefault();
  disableSearch(searchButton);
  clearHTML(gallery);
  let input = e.target.elements.searchQuery.value.trim().toLowerCase();
  pageNum = 1;
  let response = getImages(input, pageNum);
  return response;
};

const handleSecondarySubmit = e => {
  e.preventDefault();
  let input = e.target.elements.searchQuery.value.trim().toLowerCase();
  pageNum = 1;
  getImages(input, pageNum);
};

const handleGetNextPage = () => {
  let input = userInput.value.trim().toLowerCase();
  pageNum += 1;
  if (input) {
    getImages(input, pageNum);
  }
};

const handleEnableSearch = e => {
  searchButton.disabled = false;
  searchButton.classList.remove('disabled');
};
const disableSearch = element => {
  element.disabled = true;
  element.classList.add('disabled');
};

const hideButton = element => element.classList.add('hidden');

form.addEventListener('submit', handleSubmit);
userInput.addEventListener('blur', handleEnableSearch);
getNextPageButton.addEventListener('click', handleGetNextPage);

const clearHTML = element => (element.innerHTML = '');
