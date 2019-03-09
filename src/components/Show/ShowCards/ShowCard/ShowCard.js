import React from 'react';
import { Link } from 'react-router-dom';

import Image from '../../../UI/Image/Image';

export const ShowCard = props => {
  const detailLink = `/shows/${props.showId}`;
  return (
    <Link to={detailLink}>
      <div className="card grow">
        <div className="card-image">
          <Image url={props.imageUrl} alt={props.showName} />
        </div>
        <div className="card-content has-text-centered">
          <div className="content">{props.showName}</div>
        </div>
      </div>
    </Link>
  );
};
