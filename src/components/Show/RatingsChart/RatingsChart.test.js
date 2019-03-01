import React from 'react';

import { shallow } from 'enzyme';

import { RatingsChart } from './RatingsChart';
import HighchartsReact from 'highcharts-react-official';

describe('<Seasons />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<RatingsChart />);
  });

  it('renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render HighchartsReact if props.episodes', () => {
    wrapper.setProps({ episodes: [] });
    const highchartsReact = wrapper.find(HighchartsReact).first();
    expect(highchartsReact.exists()).toBe(true);
  });
});
