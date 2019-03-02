import React from 'react';

import { shallow } from 'enzyme';

import { ShowCards } from './ShowCards';
import { ShowCard } from './ShowCard/ShowCard';

describe('<ShowCards />', () => {
  let wrapper;
  const shows = [];

  beforeEach(() => {
    wrapper = shallow(<ShowCards shows={shows} />);
  });

  it('renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('does not render ShowCards when shows are empty', () => {
    const showCards = wrapper.find(ShowCard);
    expect(showCards).toHaveLength(0);
  });

  it('should create as many ShowCards as there are shows', () => {
    const showLength = 10;
    const newShows = [];
    for (let i = 0; i < showLength; i++) {
      newShows.push({ id: i });
    }

    wrapper.setProps({ shows: newShows });
    const showCards = wrapper.find(ShowCard);
    expect(showCards).toHaveLength(10);
  });
});
