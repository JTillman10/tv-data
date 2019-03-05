import React from 'react';

import { Episode } from './Episode/Episode';

export const Episodes = props => {
  let episodes = <div />;

  if (props.episodes) {
    const episodeList = props.episodes.map(episode => {
      const isSelected =
        episode.season_number === props.selectedEpisode.season &&
        episode.episode_number === props.selectedEpisode.episode;
      return (
        <tr
          id={`s${episode.season_number}e${episode.episode_number}`}
          key={episode.id}
          className={isSelected ? 'is-selected' : ''}
        >
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
