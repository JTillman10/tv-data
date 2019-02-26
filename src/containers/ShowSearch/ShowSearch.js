import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Search from '../../components/UI/Search/Search';

import { search } from '../../store/search/search.actions';

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
    this.props.history.push(`/shows/${selectedShowId}`);
  };

  render() {
    return (
      <section className="section">
        <div className="container">
          <form>
            <Search
              searched={this.onSearchedHandler}
              selected={this.onSelectedHandler}
              searchResults={this.props.searchResults}
            />
          </form>
        </div>
      </section>
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
    onSearch: searchParameter => dispatch(search(searchParameter))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ShowSearch));
