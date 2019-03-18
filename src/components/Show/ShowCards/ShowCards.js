import React from 'react';

import { ShowCard } from './ShowCard/ShowCard';

export const ShowCards = props => {
  const { shows } = props;
  let cardColumns = <div />;

  if (shows.length > 0) {
    cardColumns = shows.map(show => {
      return (
        <div
          className="column is-one-fifth-widescreen is-one-quarter-desktop is-one-third-tablet is-half-mobile"
          key={show.id}
        >
          <ShowCard showId={show.id} showName={show.original_name} imageUrl={show.poster_path} />
        </div>
      );
    });
  }

  return <div className="columns is-multiline is-mobile">{cardColumns}</div>;
};
