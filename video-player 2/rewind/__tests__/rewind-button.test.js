
import React from 'react';
import renderer from 'react-test-renderer';

import RewindButton from '../rewind-button';


describe('RewindButton', () => {
  const player = {};

  beforeAll(() => {
    player.currentTime = jest.fn().mockImplementation(() => 40);
  });

  afterAll(() => jest.resetAllMocks());

  it('renders according to valid snapshot', () => {
    const component = renderer.create(
      <RewindButton
        player={player}
      />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('calls player.currentTime twice', () => {
    const component = renderer.create(
      <RewindButton
        player={player}
      />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    tree.props.onClick();

    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    expect(player.currentTime).toHaveBeenCalledTimes(2);
  });
});
