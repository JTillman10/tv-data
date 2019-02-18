import React from 'react';

export const SeasonList = props => {
  let seasonList = [];

  for (let i = 1; i < props.numberOfSeasons; i++) {
    seasonList.push(
      // <li key={i}>
      //   <a
      //     href="/"
      //     onClick={event => props.onSelectSeason(event, i)}
      //     className={props.currentSelectedSeason === i ? 'is-active' : ''}
      //   >
      //     Season {i}
      //   </a>
      // </li>
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
    // <aside className="menu">
    //   <ul className="menu-list">{seasonList}</ul>
    // </aside>
    <div className="field">
      <div className="control">
        <div className="select">
          <select onChange={props.onSelectSeason}>{seasonList}</select>
        </div>
      </div>
    </div>
  );
};
