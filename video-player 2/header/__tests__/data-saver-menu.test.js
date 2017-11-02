import React from 'react';
import renderer from 'react-test-renderer';
import DataSaverMenu from '../data-saver-menu';


describe('DataSaverMenu', () => {
  const player = {};
  const onSelectDataSaverOption = jest.fn();
  const options = [
    {
      label: 'saver',
    },
    {
      label: 'sd',
    },
    {
      label: 'hd',
    },
  ];
  const selected = {
    label: 'hd',
    description: 'desc',
    bitrate: 100,
  };

  it('should render with no selection', () => {
    const component = renderer.create(
      <DataSaverMenu
        player={player}
        onSelectDataSaverOption={onSelectDataSaverOption}
        options={options}
        selected={{}}
      />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render with hd selected', () => {
    const component = renderer.create(
      <DataSaverMenu
        player={player}
        onSelectDataSaverOption={onSelectDataSaverOption}
        options={options}
        selected={selected}
      />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
