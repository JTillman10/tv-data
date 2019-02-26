import React from 'react';

import { shallow } from 'enzyme';

import { ShowSearch } from './ShowSearch';
import Search from '../../components/UI/Search/Search';

describe('<ShowSearch />', () => {
  let wrapper;

  const onSearchFunction = jest.fn();

  it('renders', () => {
    wrapper = shallow(<ShowSearch onSearch={onSearchFunction} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('calls onSearch on mount', () => {
    expect(onSearchFunction).toHaveBeenCalledWith('');
  });

  describe('Search', () => {
    let search;
    const searchResults = [{}, { id: 'correctId' }];
    const pushFunction = jest.fn();

    beforeEach(() => {
      wrapper.setProps({ searchResults, history: { push: pushFunction } });
      search = wrapper.find(Search).first();
    });

    it('renders', () => {
      expect(search.exists()).toBe(true);
    });

    it('searched calls onSearch with the search parameter', () => {
      const event = {
        target: {
          value: 'value'
        }
      };
      search.prop('searched')(event);
      expect(onSearchFunction).toHaveBeenCalledWith(event.target.value);
    });

    it('selected calls history.push with correct showId', () => {
      const index = 1;
      search.prop('selected')(index);
      expect(pushFunction).toHaveBeenCalledWith(`/shows/${searchResults[index].id}`);
    });
  });
});
