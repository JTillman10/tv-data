import React, { Component } from 'react';
import axios from 'axios';
import { APIKEY } from '../../../../axios/apiKey.constant';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export class RatingsChart extends Component {
  state = {
    episodes: null
  };

  componentDidMount() {
    this.getEpisodes(this.props.selectedSeason);
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedSeason !== prevProps.selectedSeason) {
      this.getEpisodes(this.props.selectedSeason);
    }
  }

  getEpisodes(season) {
    if (season === 'all') {
      const seasonPromises = [];
      for (let i = 1; i <= this.props.numberOfSeasons; i++) {
        seasonPromises.push(() =>
          axios.get(`http://www.omdbapi.com/?apikey=${APIKEY}&i=${this.props.showId}&season=${i}`)
        );
      }

      axios.all(seasonPromises.map(promise => promise())).then(
        axios.spread((...rest) => {
          const episodes = rest.map(season => season.data.Episodes).flat();
          this.setState({ episodes });
        })
      );
    } else {
      axios
        .get(`http://www.omdbapi.com/?apikey=${APIKEY}&i=${this.props.showId}&season=${season}`)
        .then(response => {
          this.setState({ episodes: response.data.Episodes });
        });
    }
  }

  render() {
    if (this.state.episodes) {
      const data = this.state.episodes.map(episode => {
        return {
          name: episode.Title,
          id: episode.imdbID,
          y: parseFloat(episode.imdbRating)
        };
      });

      const options = {
        title: {
          text: null
        },
        series: [
          {
            data,
            lineWidth: 5
          }
        ],
        plotOptions: {
          series: {
            cursor: 'pointer',
            point: {
              events: {
                click: e => {
                  this.props.selectEpisode(e.point.id);
                }
              }
            }
          }
        }
      };

      return (
        <div>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      );
    } else {
      return <div />;
    }
  }
}
