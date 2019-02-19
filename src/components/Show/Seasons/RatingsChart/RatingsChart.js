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
          axios.get(`https://www.omdbapi.com/?apikey=${APIKEY}&i=${this.props.showId}&season=${i}`)
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
        .get(`https://www.omdbapi.com/?apikey=${APIKEY}&i=${this.props.showId}&season=${season}`)
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
          y: parseFloat(episode.imdbRating),
          episode: episode.Episode
        };
      });

      const options = {
        credits: {
          enabled: false
        },
        title: {
          text: null
        },
        series: [
          {
            showInLegend: false,
            data,
            lineWidth: 5
          }
        ],
        yAxis: {
          title: {
            enabled: false
          }
        },
        tooltip: {
          // headerFormat: `<span style="font-size: 10px">{point.number} - {point.key}</span>  <b>({point.y})</b>`,
          // pointFormat: undefined
          formatter: function() {
            return `<span style="font-size: 10px">E${this.point.episode} ${
              this.point.name
            }</span>  <b>(${this.point.y})</b>`;
          }
        },
        plotOptions: {
          series: {
            allowPointSelect: true,
            cursor: 'pointer',
            point: {
              events: {
                click: e => {
                  this.props.selectEpisode(e.point.id);
                }
              }
            },
            pointStart: 1
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
