import React from 'react';

export const Overview = props => {
  return (
    <div className="box">
      <h1 className="title is-uppercase is-2">{props.data.Title}</h1>
      <div className="subtitle is-5 has-text-grey-light">{props.data.Year}</div>
      <div className="subtitle is-4 has-text-grey-light">{props.data.Plot}</div>
      {/* <div>Writers</div>
    <div>Actors</div>
    <div>imdbVotes</div> */}
    </div>
  );
};
