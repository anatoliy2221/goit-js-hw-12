import { refs } from './js/refs';
import { onFormSubmit } from './js/onFormSubmit';
import { onloadMoreClick } from './js/onFormSubmit';

refs.form.addEventListener('submit', onFormSubmit);
refs.btnLoadMore.addEventListener('click', onloadMoreClick);
