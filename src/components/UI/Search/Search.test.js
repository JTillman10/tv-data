import React from 'react';

import { shallow } from 'enzyme';

import { Search } from './Search';

describe('<Search />', () => {
  let wrapper;

  it('renders', () => {
    wrapper = shallow(<Search searchResults={[]} />);
    expect(wrapper.exists()).toBe(true);
  });

  describe('input', () => {
    let input;
    const searchedFunction = jest.fn();

    beforeEach(() => {
      wrapper = shallow(<Search searchResults={[]} searched={searchedFunction} />);
      input = wrapper.find('input').first();
    });

    it('should exist', () => {
      expect(input.exists()).toBe(true);
    });

    describe('the user populates the input', () => {
      beforeEach(() => {
        input.simulate('change');
      });

      it('should call searchedFunction', () => {
        expect(searchedFunction).toHaveBeenCalled();
      });
    });
  });
});
