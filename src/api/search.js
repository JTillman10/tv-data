import axios from 'axios';
import { APIKEY, BASEURL } from './constants';

export const SearchShow = searchParameter => {
  return axios.get(`${BASEURL}/search/tv`, { params: { api_key: APIKEY, query: searchParameter } });
};

export const GetPopularShows = () => {
  return axios.get(`${BASEURL}/tv/popular`, { params: { api_key: APIKEY } });
};
