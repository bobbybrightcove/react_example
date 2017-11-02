import React from 'react';
import renderer from 'react-test-renderer';
import EpisodeSelector from '../episode-selector';
import contentItem from '../../__tests__/content-item.json';


describe('EpisodeSelector', () => {
  const player = {};
  const episode = contentItem;

  it('renders according to valid snapshot', () => {
    const component = renderer.create(
      <EpisodeSelector
        player={player}
        episode={episode}
      />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
