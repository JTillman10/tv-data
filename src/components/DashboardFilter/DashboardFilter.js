import React from 'react';

export const DashboardFilter = props => {
  const { onChangeFilter } = props;
  return (
    <div className="field">
      <div className="control">
        <div className="select">
          <select onChange={onChangeFilter}>
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
