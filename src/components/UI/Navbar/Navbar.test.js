import React from 'react';
import { NavLink } from 'react-router-dom';

import { shallow } from 'enzyme';

import { Navbar } from './Navbar';
import ShowSearch from '../../../containers/ShowSearch/ShowSearch';

describe('<Navbar />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Navbar />);
  });

  it('renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('has ShowSearch', () => {
    const showSearch = wrapper.find(ShowSearch).first();
    expect(showSearch.exists()).toBe(true);
  });

  describe('Dashboard link', () => {
    let link;

    beforeEach(() => {
      link = wrapper.find(NavLink).first();
    });

    it('should have to prop "/"', () => {
      expect(link.prop('to')).toBe('/');
    });

    it('should have a link called DASHBOARD', () => {
      expect(link.prop('children')).toBe('DASHBOARD');
    });
  });
});
