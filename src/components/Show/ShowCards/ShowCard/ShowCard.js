import React from 'react';
import { Link } from 'react-router-dom';

import { GetImageUrl } from '../../../../api/show';

export const ShowCard = props => {
  const detailLink = `/shows/${props.showId}`;
  return (
    <Link to={detailLink}>
      <div className="card">
        <div className="card-image">
          <figure className="image">
            <img src={GetImageUrl(props.imageUrl)} alt={props.showName} />
          </figure>
        </div>
        <div className="card-content has-text-centered">
          <div className="content">{props.showName}</div>
        </div>
      </div>
    </Link>
  );
};
