import React from 'react';

export const DashboardFilter = props => {
  return (
    <div className="field">
      <div className="control">
        <div className="select">
          <select onChange={props.onChangeFilter}>
            <option key="popular" value={'popular'}>
              Popular
            </option>
            <option key="top-rated" value={'topRated'}>
              Top Rated
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};
