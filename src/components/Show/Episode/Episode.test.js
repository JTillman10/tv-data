import React from 'react';

import { shallow } from 'enzyme';

import { Episode } from './Episode';

describe('<Episode />', () => {
  let wrapper;
  let box;

  const episode = {
    name: 'Episode',
    season_number: 'Season Number',
    episode_number: 'Episode Number',
    air_date: '2019-05-31',
    overview: 'OVerview'
  };

  beforeEach(() => {
    wrapper = shallow(<Episode episode={episode} />);
    box = wrapper.find('div.box');
  });

  it('renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('formats the season number/episode number/episode name correctly', () => {
    const h1 = box.find('h1');
    expect(h1.text()).toBe(`S${episode.season_number}E${episode.episode_number} - ${episode.name}`);
  });

  it('formates the date correctly', () => {
    const date = box.find('div.has-text-grey-light');
    expect(date.text()).toBe('5/31/2019');
  });

  it('displays the ovewview', () => {
    const overview = box.find('div.has-text-grey');
    expect(overview.text()).toBe(episode.overview);
  });

  it('only displays div if no episode', () => {
    wrapper.setProps({ episode: null });
    expect(wrapper.find('div')).toHaveLength(1);
  });
});
