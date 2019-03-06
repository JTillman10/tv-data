import React from 'react';

import { shallow } from 'enzyme';

import { Episode } from './Episode';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

describe('<Episode />', () => {
  let wrapper;

  const episode = {
    name: 'Episode',
    season_number: 10,
    episode_number: 100,
    air_date: '2019-05-31',
    overview: 'OVerview'
  };

  beforeEach(() => {
    wrapper = shallow(<Episode episode={episode} />);
  });

  it('renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  describe('componentDidMount', () => {
    //TODO: test component did mount
  });

  it('should format the episode number in the first column', () => {
    const firstColumn = wrapper.find('div.column.is-1 h1.title').first();
    const correctText = `S${episode.season_number}E${episode.episode_number}`;
    expect(firstColumn.text()).toBe(correctText);
  });

  it('should display a figure if the state has a still path', () => {
    wrapper.setState({ stillPath: 'path' });
    const figure = wrapper.find('figure').first();
    expect(figure.exists()).toBe(true);
  });

  it('should display the name in the third column header', () => {
    const secondColumnHeader = wrapper.find('div.column.is-7 h1').first();
    expect(secondColumnHeader.text()).toBe(episode.name);
  });

  describe('when the overview length is greater than 175', () => {
    let overviewElement;

    beforeEach(() => {
      const overview = new Array(176).fill('a').join('');
      const newEpisode = Object.assign(episode, {
        overview
      });
      wrapper.setState({ episode: newEpisode });
      overviewElement = wrapper.find('div.column.is-7 div').first();
    });

    it('should only show 175 characters of the overview on initial load', () => {
      expect(overviewElement.text()).toHaveLength(175);
    });

    it('should show the entire overview when showAll is true', () => {
      wrapper.setState({ showAll: true });
      overviewElement = wrapper.find('div.column.is-7 div').first();
      expect(overviewElement.text()).toHaveLength(176);
    });

    describe('the caret', () => {
      it('should be added', () => {
        const caret = wrapper.find(FontAwesomeIcon).first();
        expect(caret.exists()).toBe(true);
      });

      it('should add the caret-down icon if showAll is false', () => {
        wrapper.setState({ showAll: false });
        const caret = wrapper.find(FontAwesomeIcon).first();
        expect(caret.prop('icon')).toBe('caret-down');
      });

      it('should add the caret-up icon if showAll is false', () => {
        wrapper.setState({ showAll: true });
        const caret = wrapper.find(FontAwesomeIcon).first();
        expect(caret.prop('icon')).toBe('caret-up');
      });

      it('button should flip showAll when clicked', () => {
        wrapper.setState({ showAll: false });
        const caretButton = wrapper.find('button').first();
        caretButton.simulate('click');
        expect(wrapper.state('showAll')).toBe(true);
      });
    });
  });

  it('should format the date correctly', () => {
    const date = wrapper.find('div.column.is-2 h1.is-pulled-right').first();
    expect(date.text()).toBe('5/31/2019');
  });
});
