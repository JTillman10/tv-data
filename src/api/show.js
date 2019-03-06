import axios from 'axios';
import { APIKEY, BASEURL, BASEIMAGEURL } from './constants';

const delay = t => new Promise(resolve => setTimeout(resolve, t));

export const GetShow = showId => {
  return axios.get(`${BASEURL}/tv/${showId}`, { params: { api_key: APIKEY } });
};

export const GetSeason = (showId, seasonNumber) => {
  return axios.get(`${BASEURL}/tv/${showId}/season/${seasonNumber}`, {
    params: { api_key: APIKEY }
  });
};

export const GetAllSeasons = (showId, numberOfSeasons) => {
  const seasonPromises = [];
  for (let i = 1; i <= numberOfSeasons; i++) {
    seasonPromises.push(() =>
      axios.get(`${BASEURL}/tv/${showId}/season/${i}`, {
        params: { api_key: APIKEY }
      })
    );
  }

  return axios.all(seasonPromises.map(promise => promise())).then(
    axios.spread((...rest) => {
      // return rest.map(season => season.data.episodes).flat();
      const episodes = rest.map(season => season.data.episodes);
      return [].concat(...episodes);
    })
  );
};

export const GetEpisode = (showId, seasonNumber, episodeNumber) => {
  return axios.get(`${BASEURL}/tv/${showId}/season/${seasonNumber}/episode/${episodeNumber}`, {
    params: { api_key: APIKEY }
  });
};

export const GetImageUrl = imageUrl => {
  return `${BASEIMAGEURL}/w200/${imageUrl}`;
};

export const GetEpisodeStillUrls = (showId, seasonNumber, episodeNumber) => {
  return axios
    .get(`${BASEURL}/tv/${showId}/season/${seasonNumber}/episode/${episodeNumber}/images`, {
      params: { api_key: APIKEY }
    })
    .then(response => {
      return response;
    })
    .catch(error => {
      if (error.response.status === 429) {
        return delay(10 * 1000).then(() => {
          return GetEpisodeStillUrls(showId, seasonNumber, episodeNumber);
        });
      }
    });
};
