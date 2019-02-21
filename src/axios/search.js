import axios from 'axios';
import { APIKEY } from './apiKey.constant';

export const Search = axios.create({
  baseURL: `https://api.themoviedb.org/3/search/tv?api_key=${APIKEY}`
});
