import React from 'react';
import PropTypes from 'prop-types';

import SeasonSelectorMenuOption from './season-selector-menu-option';

function SeasonSelectorMenu({ player, options, selected, onSelectSeasonSelectorOption }) {
  return (
    <div>
      {
        options.map((option) => {
          const isSelected = option.seasonNumber === selected.seasonNumber;
          return (
            <SeasonSelectorMenuOption
              key={option.id}
              option={option}
              isSelected={isSelected}
              onClick={() => { onSelectSeasonSelectorOption(player, option); }}
            />
          );
        })
      }
    </div>
  );
}

SeasonSelectorMenu.propTypes = {
  onSelectSeasonSelectorOption: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    seasonNumber: PropTypes.number,
    episodes: PropTypes.array,
  })).isRequired,
  selected: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    rating: PropTypes.object,
    duration: PropTypes.number,
    continuity: PropTypes.number,
  }),
  // eslint-disable-next-line react/forbid-prop-types
  player: PropTypes.object.isRequired,
};

SeasonSelectorMenu.defaultProps = {
  selected: null,
};

export default SeasonSelectorMenu;
