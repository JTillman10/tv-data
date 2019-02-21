import React, { Component } from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { GetSeason, GetAllSeasons } from '../../../../axios/tv';

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
      GetAllSeasons(this.props.showId, this.props.numberOfSeasons).then(results => {
        this.setState({ episodes: results });
      });
    } else {
      GetSeason(this.props.showId, season).then(response => {
        this.setState({ episodes: response.data.episodes });
      });
    }
  }

  render() {
    if (this.state.episodes) {
      const data = this.state.episodes.map(episode => {
        const { name, id, vote_average, season_number, episode_number } = episode;
        return {
          name,
          id,
          y: parseFloat(vote_average),
          season: season_number,
          episode: episode_number
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
                  this.props.selectEpisode(e.point.season, e.point.episode);
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
