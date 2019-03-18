import React from 'react';
import { Link } from 'react-router-dom';

import { shallow } from 'enzyme';

import { ShowCard } from './ShowCard';
import Image from '../../../UI/Image/Image';

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
    const expectedUrl = imageUrl;
    const image = wrapper.find(Image).first();
    expect(image.prop('url')).toBe(expectedUrl);
  });

  it('displays the show name', () => {
    const content = wrapper.find('div.content').first();
    expect(content.text()).toBe(showName);
  });
});
