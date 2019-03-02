import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getPopularShows } from '../../store/search/search.actions';

export class Dashboard extends Component {
  componentDidMount() {
    this.props.onGetPopularShows();
  }

  render() {
    if (this.props.dashboardItems) {
      console.log(this.props.dashboardItems);
    }

    return <section className="section">Dashboard</section>;
  }
}

const mapStateToProps = state => {
  return {
    dashboardItems: state.search.dashboardItems
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetPopularShows: showId => dispatch(getPopularShows(showId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Dashboard));
