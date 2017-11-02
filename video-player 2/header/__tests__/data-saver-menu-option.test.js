import React from 'react';
import renderer from 'react-test-renderer';
import DataSaverMenuOption from '../data-saver-menu-option';

describe('DataSaverMenu', () => {
  it('should render with no selection', () => {
    const onClick = jest.fn();
    const component = renderer.create(
      <DataSaverMenuOption
        onClick={onClick}
        option={{
          label: 'label',
          description: 'description',
          bitrate: 100000,
        }}
      />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
