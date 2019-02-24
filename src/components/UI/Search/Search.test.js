import React from 'react';

import { shallow } from 'enzyme';

import { Search } from './Search';

describe('<Search />', () => {
  let wrapper;
  const searchedFunction = jest.fn();
  const prevenDefaultFunction = jest.fn();
  const onHighlightItemFunction = jest.fn();

  it('renders', () => {
    wrapper = shallow(<Search searchResults={[]} />);
    expect(wrapper.exists()).toBe(true);
  });

  describe('input', () => {
    let input;

    beforeEach(() => {
      wrapper = shallow(
        <Search
          searchResults={[]}
          searched={searchedFunction}
          onHighlightItem={onHighlightItemFunction}
        />
      );
      wrapper.setProps({
        searchResults: [],
        searched: searchedFunction,
        onHighlightItem: onHighlightItemFunction
      });
      input = wrapper.find('input').first();
    });

    it('should exist', () => {
      expect(input.exists()).toBe(true);
    });

    describe('the user populates the input', () => {
      it('should call searchedFunction', () => {
        input.simulate('change');
        expect(searchedFunction).toHaveBeenCalled();
      });

      it('should call onHighlightItem with null', () => {
        input.simulate('keyDown', {
          keyCode: 'random',
          preventDefault: prevenDefaultFunction
        });
        expect(onHighlightItemFunction).toHaveBeenCalledWith(null);
      });
    });
  });

  describe('search results', () => {
    const searchResults = [
      { id: 1, name: 'A', first_air_date: '2019-01-01' },
      { id: 2, name: 'B', first_air_date: '' },
      { id: 3, name: 'C', first_air_date: '' }
    ];

    const onHighlightItemUpFunction = jest.fn();
    const onHighlightItemDownFunction = jest.fn();
    const selectedFunction = jest.fn();

    beforeEach(() => {
      wrapper = shallow(
        <Search
          searchResults={searchResults}
          searched={searchedFunction}
          selected={selectedFunction}
          onHighlightItemUp={onHighlightItemUpFunction}
          onHighlightItemDown={onHighlightItemDownFunction}
        />
      );
    });

    it('displays list item for each result', () => {
      const results = wrapper.find('li');
      expect(results).toHaveLength(3);
    });

    it('displays the year correctly', () => {
      const result = wrapper.find('a').first();
      const year = result.text().split(' ')[1];
      expect(year).toEqual('(2019)');
    });

    describe('the user uses the up arrow', () => {
      beforeEach(() => {
        const input = wrapper.find('input').first();
        input.simulate('keyDown', {
          preventDefault: prevenDefaultFunction,
          keyCode: 38
        });
      });

      it('calls event.preventDefault', () => {
        expect(prevenDefaultFunction).toHaveBeenCalled();
      });

      it('calls onHighlightItemUp', () => {
        expect(onHighlightItemUpFunction).toHaveBeenCalled();
      });
    });

    describe('the user uses the down arrow', () => {
      beforeEach(() => {
        const input = wrapper.find('input').first();
        input.simulate('keyDown', {
          preventDefault: prevenDefaultFunction,
          keyCode: 40
        });
      });

      it('calls event.preventDefault', () => {
        expect(prevenDefaultFunction).toHaveBeenCalled();
      });

      it('calls onHighlightItemUp', () => {
        expect(onHighlightItemDownFunction).toHaveBeenCalled();
      });
    });

    describe('the user uses the enter key on a result', () => {
      beforeEach(() => {
        wrapper.setProps({ highlightedItem: 1 });
        const input = wrapper.find('input').first();
        input.simulate('keyDown', {
          preventDefault: prevenDefaultFunction,
          keyCode: 13
        });
      });

      it('calls event.preventDefault', () => {
        expect(prevenDefaultFunction).toHaveBeenCalled();
      });

      it('calls selected', () => {
        expect(selectedFunction).toHaveBeenCalledWith(1);
      });
    });

    describe('the user clicks on a result', () => {
      beforeEach(() => {
        wrapper.setProps({ highlightedItem: 2 });
        const result = wrapper.find('a').first();
        result.simulate('click', {
          preventDefault: prevenDefaultFunction
        });
      });

      it('calls event.preventDefault', () => {
        expect(prevenDefaultFunction).toHaveBeenCalled();
      });

      it('calls selected', () => {
        expect(selectedFunction).toHaveBeenCalledWith(2);
      });
    });
  });
});
