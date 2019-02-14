import axios from 'axios';

const apiKey = '6cddc8d7';

export const Search = axios.create({
  baseURL: `http://www.omdbapi.com/?apikey=${apiKey}&r=json&type=series`
});
