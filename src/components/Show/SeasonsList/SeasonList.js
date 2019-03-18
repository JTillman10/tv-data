import React from 'react';

export const SeasonList = props => {
  const { numberOfSeasons, onSelectSeason } = props;
  let seasonList = [];

  for (let i = 1; i <= numberOfSeasons; i++) {
    seasonList.push(
      <option key={i} value={i}>
        Season {i}
      </option>
    );
  }

  seasonList.push(
    <option key={'all'} value={'all'}>
      All Seasons
    </option>
  );

  return (
    <div className="field">
      <div className="control">
        <div className="select">
          <select onChange={onSelectSeason}>{seasonList}</select>
        </div>
      </div>
    </div>
  );
};
