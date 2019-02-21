import React from 'react';

export const Overview = props => {
  return (
    <div className="box">
      <h1 className="title is-uppercase is-2">{props.data.original_name}</h1>
      <div className="subtitle is-5 has-text-grey-light">
        {props.data.first_air_date.split('-')[0]}
      </div>
      <div className="subtitle is-4 has-text-grey-light">{props.data.overview}</div>
    </div>
  );
};
