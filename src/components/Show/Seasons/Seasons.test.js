import React from 'react';

import { shallow } from 'enzyme';

import { Seasons } from './Seasons';
import { SeasonList } from './SeasonsList/SeasonList';
import { RatingsChart } from './RatingsChart/RatingsChart';

describe('<Seasons />', () => {
  let wrapper;

  const onGetEpisodesForSeasonFunction = jest.fn();
  const onUpdateSelectedSeasonFunction = jest.fn();
  const selectSeasonFunction = jest.fn();
  const selectEpisodeFunction = jest.fn();

  const showId = 'showId';
  const selectedSeason = 1;
  const totalSeasons = 10;
  const episodes = 'episodes';

  beforeEach(() => {
    wrapper = shallow(
      <Seasons
        onGetEpisodesForSeason={onGetEpisodesForSeasonFunction}
        onUpdateSelectedSeason={onUpdateSelectedSeasonFunction}
        selectSeason={selectSeasonFunction}
        selectEpisode={selectEpisodeFunction}
        showId={showId}
        selectedSeason={selectedSeason}
        totalSeasons={totalSeasons}
        episodes={episodes}
      />
    );
  });

  it('renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('has SeasonList', () => {
    expect(wrapper.find(SeasonList).exists()).toBe(true);
  });

  it('has RatingsChart', () => {
    expect(wrapper.find(RatingsChart).exists()).toBe(true);
  });

  describe('SeasonList', () => {
    let seasonList;

    beforeEach(() => {
      seasonList = wrapper.find(SeasonList);
    });

    it('has correct currentSelectedSeason', () => {
      expect(seasonList.prop('currentSelectedSeason')).toBe(selectedSeason);
    });

    it('has correct numberOfSeasons', () => {
      expect(seasonList.prop('numberOfSeasons')).toBe(totalSeasons);
    });

    describe('onSelectSeason', () => {
      const preventDefaultFunction = jest.fn();
      const newSeasonNumber = 5;
      beforeEach(() => {
        const event = {
          preventDefault: preventDefaultFunction,
          target: { value: newSeasonNumber }
        };

        seasonList.prop('onSelectSeason')(event);
      });

      it('should call preventDefault', () => {
        expect(preventDefaultFunction).toHaveBeenCalled();
      });

      it('shouldcall selectSeason', () => {
        expect(selectSeasonFunction).toHaveBeenCalled();
      });

      it('shouldcall onUpdateSelectedSeason', () => {
        expect(onUpdateSelectedSeasonFunction).toHaveBeenCalledWith(newSeasonNumber);
      });

      it('shouldcall onGetEpisodesForSeason', () => {
        expect(onGetEpisodesForSeasonFunction).toHaveBeenCalledWith(
          showId,
          newSeasonNumber,
          totalSeasons
        );
      });
    });
  });

  describe('RatingsChart', () => {
    let ratingsChart;

    beforeEach(() => {
      ratingsChart = wrapper.find(RatingsChart);
    });

    it('has correct showId', () => {
      expect(ratingsChart.prop('showId')).toBe(showId);
    });

    it('has correct episodes', () => {
      expect(ratingsChart.prop('episodes')).toBe(episodes);
    });

    it('has correct numberOfSeasons', () => {
      expect(ratingsChart.prop('numberOfSeasons')).toBe(totalSeasons);
    });

    it('has correct selectedSeason', () => {
      expect(ratingsChart.prop('selectedSeason')).toBe(selectedSeason);
    });

    it('onSelectSeason should call selectEpisodeFunction', () => {
      ratingsChart.prop('onSelectEpisode')();
      expect(selectEpisodeFunction).toHaveBeenCalled();
    });
  });
});
