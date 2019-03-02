import React from 'react';

import { shallow } from 'enzyme';

import { Dashboard } from './Dashboard';
import { ShowCards } from '../../components/Show/ShowCards/ShowCards';

describe('<Dashboard />', () => {
  let wrapper;
  const getPopularShowsFunction = jest.fn();
  const dashboardItems = 'DASHBOARD ITEMS';

  beforeEach(() => {
    wrapper = shallow(
      <Dashboard onGetPopularShows={getPopularShowsFunction} dashboardItems={dashboardItems} />
    );
  });

  it('renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('calls onGetPopularshows', () => {
    expect(getPopularShowsFunction).toHaveBeenCalled();
  });

  it('passes dashboardItems to ShowCards', () => {
    const showCards = wrapper.find(ShowCards).first();
    expect(showCards.prop('shows')).toBe(dashboardItems);
  });
});
