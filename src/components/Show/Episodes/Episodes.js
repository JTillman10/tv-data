import React from 'react';

import { Episode } from './Episode/Episode';

export const Episodes = props => {
  let episodes = <div />;

  if (props.episodes) {
    const episodeList = props.episodes.map(episode => {
      return (
        <tr key={episode.id}>
          <td>
            <Episode episode={episode} />
          </td>
        </tr>
      );
    });

    episodes = (
      <table className="table is-striped is-fullwidth">
        <tbody>{episodeList}</tbody>
      </table>
    );
  }

  return episodes;
};

/* return (
        // <div className="box">
        //   <h1 className="title is-uppercase is-4">
        //     S{props.episode.season_number}E{props.episode.episode_number} - {props.episode.name}
        //   </h1>
        //   <div className="subtitle is-6 has-text-grey-light">
        //     {formatDate(props.episode.air_date)}
        //   </div>
        //   <div className="subtitle is-6 has-text-grey">{props.episode.overview}</div>
        // </div>
        
  
      ); */
