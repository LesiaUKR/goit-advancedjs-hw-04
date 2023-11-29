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
let perPage = 40;
let totalPages = 1;

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

async function handlerSearchSubmit(evt) {
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
  try {
    const { hits, totalHits } = await servicePixabay(
      searchQuery,
      page,
      perPage
    );
    totalPages = Math.ceil(totalHits / perPage);

    if (totalHits === 0) {
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
      createGalleryMarkup(hits);
      iziToast.success({
        title: 'Success',
        message: `Hooray! We found ${totalHits} images.`,
        messageColor: 'black',
        messageSize: '18px',
        backgroundColor: 'green',
        position: 'topRight',
        timeout: 2500,
      });
      lightbox.refresh();
      if (page < totalPages) {
        observer.observe(guard);
      }
    }
  } catch (error) {
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
  }

  if (page >= totalPages) {
    finishMessage.classList.remove('is-hidden');
  } else {
    finishMessage.classList.add('is-hidden');
  }
}

function handlerLoadMore(entries) {
  entries.forEach(async entry => {
    if (entry.isIntersecting) {
      page += 1;

      try {
        const { hits } = await servicePixabay(searchQuery, page, perPage);
        createGalleryMarkup(hits);
        lightbox.refresh();

        const { height: cardHeight } = document
          .querySelector('.gallery')
          .firstElementChild.getBoundingClientRect();

        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });

        if (page >= totalPages) {
          observer.unobserve(guard);
          finishMessage.classList.remove('is-hidden');
        }
      } catch (error) {
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
      }
    }
  });
}

function clearPage() {
  gallery.innerHTML = '';
}
