import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { DashboardFilter } from '../../components/DashboardFilter/DashboardFilter';
import { ShowCards } from '../../components/Show/ShowCards/ShowCards';

import { filterDashboard } from '../../store/search/search.actions';

export class Dashboard extends Component {
  componentDidMount() {
    this.props.onFilterDashboard(this.props.dashboardFilter);
  }

  changeFilter = event => {
    const newFilter = event.target.value;
    this.props.onFilterDashboard(newFilter);
  };

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <DashboardFilter onChangeFilter={this.changeFilter} />
          </div>
        </section>
        <section className="section is-paddingless">
          <div className="container">
            <ShowCards shows={this.props.dashboardItems} />
          </div>
        </section>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    dashboardFilter: state.search.dashboardFilter,
    dashboardItems: state.search.dashboardItems
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFilterDashboard: newFilter => dispatch(filterDashboard(newFilter))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Dashboard));
