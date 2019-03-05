import React from 'react';

import { shallow } from 'enzyme';

import { ShowDetail } from './ShowDetail';
import { Overview } from '../../components/Show/Overview/Overview';
import { Episodes } from '../../components/Show/Episodes/Episodes';
import { SeasonList } from '../../components/Show/SeasonsList/SeasonList';
import { RatingsChart } from '../../components/Show/RatingsChart/RatingsChart';

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

  const selectedEpisodeSeasonNumber = 1;
  const selectedEpisodeNumber = 1;

  const selectedSeason = 1;
  const episodes = [{}];

  const onGetShowFunction = jest.fn();
  const onGetEpisodesForSeasonFunction = jest.fn();
  const onUpdateSelectedSeasonFunction = jest.fn();
  const onEpisodeSelectedFunction = jest.fn();

  it('renders', () => {
    wrapper = shallow(
      <ShowDetail
        onGetShow={onGetShowFunction}
        onGetEpisodesForSeason={onGetEpisodesForSeasonFunction}
        onUpdateSelectedSeason={onUpdateSelectedSeasonFunction}
        onEpisodeSelected={onEpisodeSelectedFunction}
        match={match}
        showInfo={showInfo}
        selectedSeason={selectedSeason}
        episodes={episodes}
        selectedEpisodeSeasonNumber={selectedEpisodeSeasonNumber}
        selectedEpisodeNumber={selectedEpisodeNumber}
      />
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('calls onGetShow on mount', () => {
    expect(onGetShowFunction).toHaveBeenCalled();
  });

  it('calls onGetEpisodesForSeason on mount', () => {
    expect(onGetEpisodesForSeasonFunction).toHaveBeenCalled();
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

  describe('SeasonList', () => {
    let seasonList;

    beforeEach(() => {
      seasonList = wrapper.find(SeasonList).first();
    });

    it('renders', () => {
      expect(seasonList.exists()).toBe(true);
    });

    it('has correct currentSelectedSeason', () => {
      expect(seasonList.prop('currentSelectedSeason')).toBe(selectedSeason);
    });

    it('has correct numberOfSeasons', () => {
      expect(seasonList.prop('numberOfSeasons')).toBe(showInfo.number_of_seasons);
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

      it('shouldcall onUpdateSelectedSeason', () => {
        expect(onUpdateSelectedSeasonFunction).toHaveBeenCalledWith(newSeasonNumber);
      });

      it('shouldcall onGetEpisodesForSeason', () => {
        expect(onGetEpisodesForSeasonFunction).toHaveBeenCalledWith(
          match.params.showId,
          newSeasonNumber,
          showInfo.number_of_seasons
        );
      });
    });
  });

  describe('RatingsChart', () => {
    let ratingsChart;

    beforeEach(() => {
      ratingsChart = wrapper.find(RatingsChart).first();
    });

    it('renders', () => {
      expect(ratingsChart.exists()).toBe(true);
    });

    it('has correct showId', () => {
      expect(ratingsChart.prop('showId')).toBe(match.params.showId);
    });

    it('has correct episodes', () => {
      expect(ratingsChart.prop('episodes')).toBe(episodes);
    });

    it('has correct numberOfSeasons', () => {
      expect(ratingsChart.prop('numberOfSeasons')).toBe(showInfo.number_of_seasons);
    });

    it('has correct selectedSeason', () => {
      expect(ratingsChart.prop('selectedSeason')).toBe(selectedSeason);
    });

    it('onSelectEpisode should call onEpisodeSelectedFunction', () => {
      const seasonNumber = 2;
      const episodeNumber = 1;

      ratingsChart.prop('onSelectEpisode')(seasonNumber, episodeNumber);
      expect(onEpisodeSelectedFunction).toHaveBeenCalled();
    });
  });

  describe('Episodes', () => {
    let episode;

    beforeEach(() => {
      episode = wrapper.find(Episodes).first();
    });

    it('renders', () => {
      expect(episode.exists()).toBe(true);
    });

    it('has correct episodes', () => {
      expect(episode.prop('episodes')).toBe(episodes);
    });

    it('has correct selectedEpisode', () => {
      expect(episode.prop('selectedEpisode')).toEqual({
        season: selectedEpisodeSeasonNumber,
        episode: selectedEpisodeNumber
      });
    });
  });
});
