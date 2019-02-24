import axios from 'axios';
import { APIKEY, BASEURL } from './constants';

export const GetShow = tvId => {
  return axios.get(`${BASEURL}/tv/${tvId}`, { params: { api_key: APIKEY } });
};

export const GetSeason = (tvId, seasonNumber) => {
  return axios.get(`${BASEURL}/tv/${tvId}/season/${seasonNumber}`, {
    params: { api_key: APIKEY }
  });
};

export const GetAllSeasons = (tvId, numberOfSeasons) => {
  const seasonPromises = [];
  for (let i = 1; i <= numberOfSeasons; i++) {
    seasonPromises.push(() =>
      axios.get(`${BASEURL}/tv/${tvId}/season/${i}`, {
        params: { api_key: APIKEY }
      })
    );
  }

  return axios.all(seasonPromises.map(promise => promise())).then(
    axios.spread((...rest) => {
      return rest.map(season => season.data.episodes).flat();
    })
  );
};

export const GetEpisode = (tvId, seasonNumber, episodeNumber) => {
  return axios.get(`${BASEURL}/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}`, {
    params: { api_key: APIKEY }
  });
};
