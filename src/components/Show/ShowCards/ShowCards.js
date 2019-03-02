import React from 'react';

import { ShowCard } from './ShowCard/ShowCard';

export const ShowCards = props => {
  let cardColumns = <div />;

  if (props.shows.length > 0) {
    cardColumns = props.shows.map(show => {
      return (
        <div className="column is-one-quarter" key={show.id}>
          <ShowCard showName={show.original_name} imageUrl={show.poster_path} showId={show.id} />
        </div>
      );
    });
  }

  return <div className="columns is-multiline is-mobile">{cardColumns}</div>;
};
