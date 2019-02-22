import React from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export const RatingsChart = props => {
  if (props.episodes) {
    const data = props.episodes.map(episode => {
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
                props.selectEpisode(e.point.season, e.point.episode);
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
};
