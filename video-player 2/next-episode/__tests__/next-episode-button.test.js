import React from 'react';
import renderer from 'react-test-renderer';
import NextEpisodeButton from '../next-episode-button';


describe('NextEpisodeButton', () => {
  // assume current episode is on this url /watch/ef3b9004-9765-490b-b84e-38861ea1030a
  const player = {};
  const nextEpisodeID = '014e59c-ec94-4bba-aee8-bebcfe4283d9';

  it('renders according to valid snapshot', () => {
    const component = renderer.create(
      <NextEpisodeButton player={player} nextEpisodeID={nextEpisodeID} />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
