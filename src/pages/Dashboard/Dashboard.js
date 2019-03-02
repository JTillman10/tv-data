import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { ShowCards } from '../../components/Show/ShowCards/ShowCards';

import { getPopularShows } from '../../store/search/search.actions';

export class Dashboard extends Component {
  componentDidMount() {
    this.props.onGetPopularShows();
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <ShowCards shows={this.props.dashboardItems} />
        </div>
      </section>
    );
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
