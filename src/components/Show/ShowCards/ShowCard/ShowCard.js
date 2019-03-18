import React from 'react';
import { Link } from 'react-router-dom';

import Image from '../../../UI/Image/Image';

export const ShowCard = props => {
  const { showId, imageUrl, showName } = props;
  const detailLink = `/shows/${showId}`;
  const image = imageUrl ? (
    <Image url={imageUrl} alt={showName} />
  ) : (
    <div style={{ height: '328.688px' }} />
  );
  return (
    <Link to={detailLink}>
      <div className="card grow">
        <div className="card-image">{image}</div>
        <div className="card-content has-text-centered">
          <div className="content">{showName}</div>
        </div>
      </div>
    </Link>
  );
};
