import React from 'react';

import { shallow } from 'enzyme';

import { SeasonList } from './SeasonList';

describe('<SeasonList />', () => {
  let wrapper;

  const numberOfSeasons = 10;
  const onSelectSeasonFunction = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <SeasonList numberOfSeasons={numberOfSeasons} onSelectSeason={onSelectSeasonFunction} />
    );
  });

  it('renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('readners the correct number of options', () => {
    const options = wrapper.find('option');
    expect(options).toHaveLength(numberOfSeasons + 1);
  });

  it('calls onSelectSeason when the select box changes', () => {
    const select = wrapper.find('select').first();
    select.simulate('change');
    expect(onSelectSeasonFunction).toHaveBeenCalled();
  });
});
