import React from 'react';
import { Link } from 'react-router-dom';

import { shallow } from 'enzyme';

import { ShowCard } from './ShowCard';

import { GetImageUrl } from '../../../../api/show';

describe('<ShowCard />', () => {
  let wrapper;
  const showName = 'Show Name';
  const showId = '12345';
  const imageUrl = 'ImageUrl';

  beforeEach(() => {
    wrapper = shallow(<ShowCard showName={showName} showId={showId} imageUrl={imageUrl} />);
  });

  it('renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('has a card', () => {
    const card = wrapper.find('.card').first();
    expect(card.exists()).toBe(true);
  });

  it('wraps the correct link around the card', () => {
    const link = wrapper.find(Link).first();
    expect(link.prop('to')).toBe(`/shows/${showId}`);
  });

  it('has an image with the correct url', () => {
    const expectedUrl = GetImageUrl(imageUrl);
    const image = wrapper.find('img').first();
    expect(image.prop('src')).toBe(expectedUrl);
  });

  it('displays the show name', () => {
    const content = wrapper.find('div.content').first();
    expect(content.text()).toBe(showName);
  });
});
