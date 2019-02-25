import React from 'react';

export const Overview = props => {
  return (
    <div className="box">
      <h1 className="title is-uppercase is-2">{props.name}</h1>
      <div className="subtitle is-5 has-text-grey-light">{props.airDate.split('-')[0]}</div>
      <div className="subtitle is-4 has-text-grey-light">{props.summary}</div>
    </div>
  );
};
