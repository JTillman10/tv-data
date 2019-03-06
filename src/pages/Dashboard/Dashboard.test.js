import React from 'react';

import { shallow } from 'enzyme';

import { Dashboard } from './Dashboard';
import { ShowCards } from '../../components/Show/ShowCards/ShowCards';
import { DashboardFilter } from '../../components/DashboardFilter/DashboardFilter';

describe('<Dashboard />', () => {
  let wrapper;
  const dashboardItems = 'DASHBOARD ITEMS';
  const onFilterDashboardFunction = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <Dashboard onFilterDashboard={onFilterDashboardFunction} dashboardItems={dashboardItems} />
    );
  });

  it('renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('calls onFilterDashboard', () => {
    expect(onFilterDashboardFunction).toHaveBeenCalled();
  });

  it('passes dashboardItems to ShowCards', () => {
    const showCards = wrapper.find(ShowCards).first();
    expect(showCards.prop('shows')).toBe(dashboardItems);
  });

  describe('DashboardFilter', () => {
    it('calls onFilterDashboard on change', () => {
      const newFilter = 'newFilter';
      const dashboardFilter = wrapper.find(DashboardFilter);
      const event = {
        target: { value: newFilter }
      };

      dashboardFilter.prop('onChangeFilter')(event);
      expect(onFilterDashboardFunction).toHaveBeenLastCalledWith(newFilter);
    });
  });
});
