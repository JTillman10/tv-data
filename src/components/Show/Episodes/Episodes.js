import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Episode } from './Episode/Episode';
import { selectEpisode } from '../../../store/show/show.actions';

export class Episodes extends Component {
  render() {
    let episodes = <div />;

    if (this.props.episodes) {
      const episodeList = this.props.episodes.map(episode => {
        return (
          <tr
            id={`episode-${episode.id}`}
            key={episode.id}
            // className={episode.id === this.props.selectedEpisodeId ? 'is-selected' : ''}
            className={[
              episode.id === this.props.selectedEpisodeId ? 'is-selected' : '',
              'grow'
            ].join(' ')}
            onClick={() => this.props.onEpisodeSelected(episode.id)}
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
  }
}

const mapStateToProps = state => {
  return {
    episodes: state.show.episodes,
    selectedEpisodeId: state.show.selectedEpisodeId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onEpisodeSelected: selectedEpisodeId => dispatch(selectEpisode(selectedEpisodeId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Episodes);
