import { servicePixabay } from './servicePixabayApi';
import { createGalleryMarkup } from './createGalleryMarkup';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const guard = document.querySelector('.js-guard');
const finishMessage = document.querySelector('.finish-text');

form.addEventListener('submit', handlerSearchSubmit);

let searchQuery = '';
let page = 1;
let perPage = 50;

const lightboxOpts = {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
};

const lightbox = new SimpleLightbox('.gallery .gallery__link', lightboxOpts);

const optionsObserver = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};
const observer = new IntersectionObserver(handlerLoadMore, optionsObserver);

function handlerSearchSubmit(evt) {
  evt.preventDefault();
  const newSearchQuery = evt.currentTarget.elements.searchQuery.value.trim();
  if (!newSearchQuery) {
    iziToast.warning({
      title: 'Caution',
      message: `Please enter a search query!`,
      messageColor: 'black',
      messageSize: '18px',
      backgroundColor: 'yellow',
      position: 'topRight',
      timeout: 2500,
    });
    clearPage();
    return;
  }
  clearPage();
  page = 1;
  searchQuery = newSearchQuery;

  servicePixabay(searchQuery, page, perPage)
    .then(data => {
      let totalPage = data.totalHits / perPage;

      if (data.hits.length === 0) {
        iziToast.info({
          title: 'Info',
          message: `Sorry, there are no images matching your search query. Please try again.`,
          messageColor: 'black',
          messageSize: '18px',
          backgroundColor: 'yellow',
          position: 'topRight',
          timeout: 2500,
        });
        clearPage();
        return;
      } else {
        createGalleryMarkup(data.hits);
        iziToast.success({
          title: 'Success',
          message: `Hooray! We found ${data.totalHits} images.`,
          messageColor: 'black',
          messageSize: '18px',
          backgroundColor: 'green',
          position: 'topRight',
          timeout: 2500,
        });
        lightbox.refresh();
        if (page < totalPage) {
          observer.observe(guard);
        }
      }

      if (data.totalHits <= perPage) {
        finishMessage.classList.remove('is-hidden');
      } else {
        finishMessage.classList.add('is-hidden');
      }
    })
    .catch(error => {
      console.error(error);
      iziToast.error({
        title: 'Error',
        message: `Oops! Something went wrong. Please try again later.`,
        messageColor: 'white',
        messageSize: '18px',
        backgroundColor: 'red',
        position: 'topRight',
        timeout: 2500,
      });
    });
}

function handlerLoadMore(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      page += 1;
      servicePixabay(searchQuery, page, perPage)
        .then(data => {
          if (data.hits.length > 0) {
            createGalleryMarkup(data.hits);
            lightbox.refresh();
          } else {
            observer.unobserve(guard);
            finishMessage.classList.remove('is-hidden');
          }
        })
        .catch(error => {
          console.error(error);
          iziToast.error({
            title: 'Error',
            message: `Oops! Something went wrong. Please try again later.`,
            messageColor: 'white',
            messageSize: '18px',
            backgroundColor: 'red',
            position: 'topRight',
            timeout: 2500,
          });
        });
    }
  });
}

function clearPage() {
  gallery.innerHTML = '';
}
