import axios from 'axios';

const getImagesCollections = (search, page = 1) => {
  const API_KEY = '22192349-6b91fd76fde5f4977c0f7c9ea';
  const url = 'https://pixabay.com/api/';
  return axios
    .get(
      `${url}?q=${search}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
    )
    .then(response => {
      return response.data.hits;
    });
};
export default getImagesCollections;
