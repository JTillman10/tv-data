import React, { Component } from 'react';

import './Autocomplete.scss';

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
        } else if (this.state.selectedItem - 1 < 0) {
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
          this.selectItem(0);
        } else if (this.state.selectedItem + 1 > this.props.searchResults.length - 1) {
          this.selectItem(0);
        } else {
          this.setState(prevState => ({
            selectedItem: prevState.selectedItem + 1
          }));
        }

        return;
      default:
        this.selectItem(null);
        return;
    }
  };

  selectItem = index => {
    // this.setState({ selectedItem: index, selectedValue: this.props.searchResults[index].Title });
    this.setState({ selectedItem: index });
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
                <li key={`${result.imdbID}-${index}`}>
                  <a
                    href="/"
                    className={this.state.selectedItem === index ? 'selected' : ''}
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
