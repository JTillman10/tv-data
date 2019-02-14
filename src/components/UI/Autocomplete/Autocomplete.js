import React, { Component } from 'react';

import './Autocomplete.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class Autocomplete extends Component {
  state = {
    selectedItem: null
  };

  handleKeyDown = event => {
    switch (event.keyCode) {
      case 13:
        event.preventDefault();
        this.props.selected(this.state.selectedItem);
        return;
      case 38:
        event.preventDefault();
        if (this.state.selectedItem === null) {
          this.selectItem(this.props.searchResults.length - 1);
        } else if (this.state.selectedItem - 1 === 0) {
          this.selectItem(this.props.searchResults.length - 1);
        } else {
          this.setState(prevState => ({
            selectedItem: prevState.selectedItem - 1
          }));
        }

        return;
      case 40:
        event.preventDefault();
        if (this.state.selectedItem === null) {
          tthis.selectItem(0);
        } else if (this.state.selectedItem + 1 > this.props.searchResults.length - 1) {
          this.selectItem(0);
        } else {
          this.setState(prevState => ({
            selectedItem: prevState.selectedItem + 1
          }));
        }

        return;
      default:
        return;
    }
  };

  selectItem = index => {
    this.setState({ selectedItem: index, selectedValue: this.props.searchResults[index].Title });
  };

  handleClick = event => {
    event.preventDefault();
    this.props.selected(this.state.selectedItem);
  };

  render() {
    let results;
    if (this.props.searchResults.length > 0) {
      results = (
        <aside className="menu">
          <ul className="menu-list">
            {this.props.searchResults.map((result, index) => {
              return (
                <li key={result.imdbID}>
                  <a
                    href="/"
                    className={this.state.selectedItem === index ? 'selected' : ''}
                    onMouseOver={() => this.selectItem(index)}
                    onClick={this.handleClick}
                  >
                    {result.Title} ({result.Year})
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
            value={this.state.selectedValue}
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
