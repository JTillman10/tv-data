import React, { Component } from 'react';

import { connect } from 'react-redux';

import { GetImageUrl } from '../../../api/show';
import { startLoading, stopLoading } from '../../../store/base/base.actions';

export class Image extends Component {
  componentWillMount() {
    this.props.onStartLoading();
  }

  handleImageLoaded() {
    this.props.onStopLoading();
  }

  render() {
    return (
      <figure className="image">
        <img
          src={GetImageUrl(this.props.url)}
          alt={this.props.alt}
          onLoad={() => this.handleImageLoaded()}
        />
      </figure>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onStartLoading: () => dispatch(startLoading()),
    onStopLoading: () => dispatch(stopLoading())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Image);
