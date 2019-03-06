import React, { Component } from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export class RatingsChart extends Component {
  state = {
    chart: null
  };

  chartCallback = chart => {
    this.setState({ chart });
  };

  render() {
    if (this.props.episodes) {
      const data = this.props.episodes.map(episode => {
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
                  this.props.onSelectEpisode(e.point.id);
                }
              }
            },
            pointStart: 1
          }
        }
      };

      if (this.props.selectedEpisodeId && this.state.chart) {
        const data = this.state.chart.series[0].data;
        data.forEach(point => {
          if (point.id === this.props.selectedEpisodeId) {
            point.select(true, false);
          }
        });
      }

      return (
        <div>
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            callback={this.chartCallback}
          />
        </div>
      );
    } else {
      return <div />;
    }
  }
}
