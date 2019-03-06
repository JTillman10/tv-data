import React from 'react';

import { shallow } from 'enzyme';

import { Episodes } from './Episodes';
import { Episode } from './Episode/Episode';

fdescribe('<Episodes />', () => {
  let wrapper;

  const episodes = [
    {
      id: 1,
      name: 'Episode',
      season_number: 1,
      episode_number: 1
    },
    {
      id: 2,
      name: 'Episode2',
      season_number: 1,
      episode_number: 2
    }
  ];

  const selectedEpisodeId = 1;

  beforeEach(() => {
    wrapper = shallow(<Episodes episodes={episodes} selectedEpisodeId={selectedEpisodeId} />);
  });

  it('renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should create an Episode for every item in the episodes array', () => {
    const episodes = wrapper.find(Episode);
    expect(episodes).toHaveLength(2);
  });

  it('should mark the selected episode row', () => {
    const selectedRow = wrapper.find('tr').first();
    expect(selectedRow.prop('className')).toBe('is-selected');
  });
});
