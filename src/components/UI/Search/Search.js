import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Search.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  highlightItem,
  highlightItemDown,
  highlightItemUp
} from '../../../store/search/search.actions';

export class Search extends Component {
  handleKeyDown = event => {
    switch (event.keyCode) {
      case 13:
        event.preventDefault();
        this.props.selected(this.props.highlightedItem);
        return;
      case 38:
        event.preventDefault();
        this.props.onHighlightItemUp();
        return;
      case 40:
        event.preventDefault();
        this.props.onHighlightItemDown();
        return;
      default:
        this.selectItem(null);
        return;
    }
  };

  selectItem = index => {
    this.props.onHighlightItem(index);
  };

  handleClick = event => {
    event.preventDefault();
    this.props.selected(this.props.highlightedItem);
  };

  render() {
    let results;
    if (this.props.searchResults.length > 0) {
      results = (
        <aside className="menu">
          <ul className="menu-list">
            {this.props.searchResults.map((result, index) => {
              return (
                <li key={`${result.id}-${index}`}>
                  <a
                    href="/"
                    className={this.props.highlightedItem === index ? 'selected' : ''}
                    onMouseOver={() => this.selectItem(index)}
                    onClick={this.handleClick}
                  >
                    {result.name} ({result.first_air_date.split('-')[0]})
                  </a>
                </li>
              );
            })}
          </ul>
        </aside>
      );
    }

    return (
      <div className="field">
        <p className="control has-icons-left">
          <input
            className="input is-large"
            type="text"
            placeholder="Search for a show"
            onChange={this.props.searched}
            onKeyDown={this.handleKeyDown}
            // value={this.state.selectedValue}
          />
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon="search" />
          </span>
        </p>
        {results}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    highlightedItem: state.search.highlightedItem
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onHighlightItem: highlightedItem => dispatch(highlightItem(highlightedItem)),
    onHighlightItemDown: () => dispatch(highlightItemDown()),
    onHighlightItemUp: () => dispatch(highlightItemUp())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
