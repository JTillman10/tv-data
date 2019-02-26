import React from 'react';

import { shallow } from 'enzyme';

import { Overview } from './Overview';

describe('<Overview />', () => {
  let wrapper;
  let box;

  const name = 'Name';
  const airDate = 'Air Date';
  const summary = 'Summary';

  beforeEach(() => {
    wrapper = shallow(<Overview name={name} airDate={airDate} summary={summary} />);
    box = wrapper.find('div.box');
  });

  it('renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders name', () => {
    expect(box.find('h1').text()).toBe(name);
  });

  it('renders airDate', () => {
    expect(box.find('div.is-5').text()).toBe(airDate);
  });

  it('renders summary', () => {
    expect(box.find('div.is-4').text()).toBe(summary);
  });
});
