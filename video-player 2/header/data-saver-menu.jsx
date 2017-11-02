import React from 'react';
import PropTypes from 'prop-types';

import DataSaverMenuOption from './data-saver-menu-option';

function DataSaverMenu({ player, options, selected, onSelectDataSaverOption }) {
  return (
    <div>
      <h4>Data Saver</h4>
      {
        options.map((option) => {
          const isSelected = option.label === selected.label;

          return (
            <DataSaverMenuOption
              key={option.label}
              option={option}
              isSelected={isSelected}
              onClick={() => { onSelectDataSaverOption(player, option); }}
            />
          );
        })
      }
    </div>
  );
}

DataSaverMenu.propTypes = {
  onSelectDataSaverOption: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    description: PropTypes.string,
    bitrate: PropTypes.number,
  })).isRequired,
  selected: PropTypes.shape({
    label: PropTypes.string,
    description: PropTypes.string,
    bitrate: PropTypes.number,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  player: PropTypes.object.isRequired,
};

export default DataSaverMenu;
