import { refs } from './refs';
import { showLoader } from './loader';
import { hideLoader } from './loader';
import { showMessageError } from './showMessageError';
import { getImagesByRequest } from './pixabay-api';
import { imagesTemplate } from './render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userInput;
let page;
let maxPage;

export async function onFormSubmit(event) {
  event.preventDefault();
  showLoader();
  userInput = event.target.elements.query.value.trim();
  refs.imageContainer.innerHTML = '';
  page = 1;

  try {
    const data = await getImagesByRequest(userInput, page);
    maxPage = Math.ceil(data.totalHits / 15);
    if (!data.hits.length) {
      showMessageError();
    }

    refs.imageContainer.innerHTML = '';
    renderImages(data.hits);
  } catch (error) {
    showMessageError();
  }
  hideLoader();
  checkBtnStatus();
  event.target.reset();
}

export async function onloadMoreClick(event) {
  event.preventDefault();
  page += 1;
  showLoader();
  const data = await getImagesByRequest(userInput, page);
  renderImages(data.hits);
  checkBtnStatus();
  hideLoader();

  if (page >= maxPage) {
    iziToast.info({
      message: `We're sorry, but you've reached the end of search results.`,
      position: 'bottomRight',
    });
  }

  const galleryItemHeight =
    refs.imageContainer.firstElementChild.getBoundingClientRect().height;

  scrollBy({
    top: galleryItemHeight * 2,
    behavior: 'smooth',
  });
}

export function renderImages(images) {
  const markup = imagesTemplate(images);
  refs.imageContainer.insertAdjacentHTML('beforeend', markup);
  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
  });

  lightbox.refresh();
}

function checkBtnStatus() {
  if (page >= maxPage) {
    refs.btnLoadMore.classList.add('hidden');
  } else {
    refs.btnLoadMore.classList.remove('hidden');
  }
}
