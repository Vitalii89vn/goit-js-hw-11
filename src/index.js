import './sass/index.scss';
import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// let lightbox = new SimpleLightbox('.gallery a');

const refs = {
    form: document.querySelector('#search-form'),
    searchBtn: document.querySelector('.search'),
    loadMoreBtn: document.querySelector('.load-more'),
    gallery: document.querySelector('.gallery'),
}

refs.form.addEventListener('submit', onSearchImages);
refs.loadMoreBtn.addEventListener('click', onClickLoadMoreBtn);

function onSearchImages(e) {
    e.preventDefault();
    console.log('ураа')    
}