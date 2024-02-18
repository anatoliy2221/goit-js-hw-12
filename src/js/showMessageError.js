import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function showMessageError() {
  iziToast.error({
    message: `Sorry, there are no images matching your search query. Please try again!`,
    position: 'topRight',
  });
}
