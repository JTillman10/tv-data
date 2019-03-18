import React from 'react';

export const Overview = props => {
  const { name, airDate, summary } = props;
  return (
    <div className="box">
      <h1 className="title is-uppercase is-2">{name}</h1>
      <div className="subtitle is-5 has-text-grey-light">{airDate.split('-')[0]}</div>
      <div className="subtitle is-4 has-text-grey-light">{summary}</div>
    </div>
  );
};
