import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Search from '../../components/Search/Search';
import './ShowSearch.scss';

import { search, resetSearchResults } from '../../store/search/search.actions';

export class ShowSearch extends Component {
  componentDidMount() {
    this.props.onSearch('');
  }

  onSearchedHandler = event => {
    const searchParameter = event.target.value;
    this.props.onSearch(searchParameter);
  };

  onSelectedHandler = selectedItemIndex => {
    const selectedShowId = this.props.searchResults[selectedItemIndex].id;
    this.props.onResetSearchResults();
    this.props.history.push(`/shows/${selectedShowId}`);
  };

  onResetResults = e => {
    this.props.onResetSearchResults();
  };

  render() {
    return (
      // <section className="section">
      <div className="ShowSearch">
        <form>
          <Search
            searched={this.onSearchedHandler}
            selected={this.onSelectedHandler}
            resetResults={this.onResetResults}
            searchResults={this.props.searchResults}
          />
        </form>
      </div>
      // </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchResults: state.search.searchResults
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearch: searchParameter => dispatch(search(searchParameter)),
    onResetSearchResults: () => dispatch(resetSearchResults())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ShowSearch));
