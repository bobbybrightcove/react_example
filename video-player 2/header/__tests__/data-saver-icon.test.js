import React from 'react';
import renderer from 'react-test-renderer';
import DataSaverIcon from '../data-saver-icon';


describe('DataSaverIcon', () => {
  const player = {};

  it('renders according to valid snapshot', () => {
    const component = renderer.create(
      <DataSaverIcon
        player={player}
      />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should change icon on mouse enter/leave', () => {
    const component = renderer.create(
      <DataSaverIcon
        player={player}
      />
    );

    // onMouseEnter
    component.toJSON().children[0].props.onMouseEnter();

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    // onMouseLeave
    tree.children[0].props.onMouseLeave();

    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should change to HD icon if HD is selected', () => {
    const component = renderer.create(
      <DataSaverIcon
        player={player}
        selected={{ label: 'hd' }}
      />
    );

    // onMouseEnter
    component.toJSON().children[0].props.onMouseEnter();

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // onMouseLeave
    tree.children[0].props.onMouseLeave();

    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should change to SD icon if SD is selected', () => {
    const component = renderer.create(
      <DataSaverIcon
        player={player}
        selected={{ label: 'sd' }}
      />
    );

    // onMouseEnter
    component.toJSON().children[0].props.onMouseEnter();

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // onMouseLeave
    tree.children[0].props.onMouseLeave();

    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should change to SAVER icon if SAVER is selected', () => {
    const component = renderer.create(
      <DataSaverIcon
        player={player}
        selected={{ label: 'saver' }}
      />
    );

    // onMouseEnter
    component.toJSON().children[0].props.onMouseEnter();

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // onMouseLeave
    tree.children[0].props.onMouseLeave();

    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
