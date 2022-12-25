import './sass/index.scss';
import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
let gallery = new SimpleLightbox('.gallery a');

const refs = {
    form: document.querySelector('#search-form'),
    loadMoreBtn: document.querySelector('.load-more'),
    gallery: document.querySelector('.gallery'),
}
let currentPage = 1;
let searchQuery = '';
let totalHits = null;

refs.form.addEventListener('submit', onSubmitSearchBtn);
refs.loadMoreBtn.addEventListener('click', onClickLoadMoreBtn);

function onSubmitSearchBtn(e) {
    e.preventDefault();
    clearRender();
    disableLoadMoreBtn();
    currentPage = 1;
    const form = e.currentTarget;
    searchQuery = form.elements.searchQuery.value.trim();
    onSearchImages(searchQuery);
    gallery.refresh();
}

function onClickLoadMoreBtn() {
    onSearchImages(searchQuery); 
}

async function onSearchImages(searchQuery) {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '32359638-7443e20de0ded3dc69cc0faa3';
      
        try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q: `${searchQuery}`,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: 'true',
                per_page: 40,
                page: `${currentPage}`,
            }
        })
        totalHits = response.data.total;
        const imagesArray = response.data.hits;

            if (totalHits !== 0) {
                 if (currentPage === 1) {
                Notiflix.Notify.success(`Hooray! We found ${totalHits} images`);
                 }
            imagesArray.map(renderMarkup);
            enableLoadMoreBtn()
            let lightbox = new SimpleLightbox('.gallery a');
            checkLastPage();
            currentPage += 1;
             
        } else {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            disableLoadMoreBtn()
        }
    } catch (error) {
            onError    }
}

function renderMarkup(element) {
    const markupGallery = `
   <div class="photo-card">
   <a href="${element.largeImageURL}">
  <img src='${element.webformatURL}' alt='${element.tags}' loading="lazy" /></a>
    <div class="info">
    <p class="info-item">
      <b>Likes</b><span class="elements">${element.likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b><span class="elements">${element.views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b><span class="elements">${element.comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b><span class="elements">${element.downloads}</span>
    </p>
  </div>
  </div>`
    refs.gallery.insertAdjacentHTML('beforeend', markupGallery)
}
function onError() {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    
}
function clearRender() {
    refs.gallery.innerHTML = '';
}
function disableLoadMoreBtn() {
    refs.loadMoreBtn.classList.add('is-hidden');
}
function enableLoadMoreBtn() {
    refs.loadMoreBtn.classList.remove('is-hidden');
}
function checkLastPage() {
    if (totalHits / currentPage / 40 <= 1) {
        disableBtn();
        Notiflix.Notify.info(`We're sorry, but you've reached the end of search results.`)
    }  
}

// const { height: cardHeight } = document
//   .querySelector('.gallery')
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });