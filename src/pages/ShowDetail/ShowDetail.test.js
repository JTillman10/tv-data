import React from 'react';

import { shallow } from 'enzyme';

import { ShowDetail } from './ShowDetail';
import { Overview } from '../../components/Show/Overview/Overview';
import { Episodes } from '../../components/Show/Episodes/Episodes';

describe('<ShowDetail />', () => {
  let wrapper;

  const match = {
    params: {
      showId: 'showId'
    }
  };

  const showInfo = {
    original_name: 'Name',
    first_air_date: 'Air Date',
    overview: 'Overview',
    number_of_seasons: 10
  };

  const onGetShowFunction = jest.fn();
  const onGetEpisodesForSeasonFunction = jest.fn();

  it('renders', () => {
    wrapper = shallow(
      <ShowDetail
        onGetShow={onGetShowFunction}
        onGetEpisodesForSeason={onGetEpisodesForSeasonFunction}
        match={match}
        showInfo={showInfo}
      />
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('calls onGetShow on mount', () => {
    expect(onGetShowFunction).toHaveBeenCalled();
  });

  describe('Overview', () => {
    let overview;

    beforeEach(() => {
      overview = wrapper.find(Overview).first();
    });

    it('renders', () => {
      expect(overview.exists()).toBe(true);
    });

    it('has correct name', () => {
      expect(overview.prop('name')).toBe(showInfo.original_name);
    });

    it('has correct airDate', () => {
      expect(overview.prop('airDate')).toBe(showInfo.first_air_date);
    });

    it('has correct summary', () => {
      expect(overview.prop('summary')).toBe(showInfo.overview);
    });
  });

  describe('Episodes', () => {
    let episode;
    // const selectedEpisode = 'Episode';

    beforeEach(() => {
      // wrapper.setProps({ selectedEpisode });
      episode = wrapper.find(Episodes).first();
    });

    it('renders', () => {
      expect(episode.exists()).toBe(true);
    });

    // it('has correct episode', () => {
    //   expect(episode.prop('episode')).toBe(selectedEpisode);
    // });
  });
});
