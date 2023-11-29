import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33612698-29a0e4fa17aff9da96c8a261f';

async function servicePixabay(searchQuery, page, perpage) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page,
    per_page: perpage,
  });

  const response = await axios.get(`${BASE_URL}?${params}`);

  return response.data;
}

export { servicePixabay };
