import axios from 'axios';

export async function getImagesByRequest(userInput, currentPage) {
  const API_KEY = '42120436-8d9fae2eb5c6f9f50c8ac4324';
  const BASE_URL = 'https://pixabay.com';
  const END_POINT = '/api/';
  const url = `${BASE_URL}${END_POINT}`;
  const params = {
    key: API_KEY,
    q: userInput,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: currentPage,
  };

  const resp = await axios.get(url, { params });
  return resp.data;
}
