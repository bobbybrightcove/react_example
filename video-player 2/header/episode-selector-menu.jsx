import React from 'react';
import PropTypes from 'prop-types';
import Collapse, { Panel } from 'rc-collapse';

import EpisodeSelectorMenuOption from './episode-selector-menu-option';
import styles from './episode-selector.css';
import back from '../icons/back.svg';
import arrowUp from '../icons/white-arrow-up.svg';

function EpisodeSelectorMenu({
  player,
  options,
  selected,
  onSelectEpisodeSelectorOption,
  setSeasonSelectorVisibility }) {
  const accordion = true;

  const onChange = (activeKey) => {
    const selectedEpisode = options.filter(e => e.id === activeKey)[0];
    onSelectEpisodeSelectorOption(player, selectedEpisode);
  };

  const backToSeasonSelector = () => {
    setSeasonSelectorVisibility(player, true);
  };

  return (
    <div>
      <p>
        <img  // eslint-disable-line jsx-a11y/no-static-element-interactions
          src={back}
          alt="Back"
          onClick={backToSeasonSelector}
        />
        <span>Season {options[0].seasonNumber}</span>
      </p>
      <Collapse
        accordion={accordion}
        className={styles.episodeSelectorOptions}
        onChange={onChange}
        defaultActiveKey={selected.id}
      >
        {
          options.map((option) => {
            return (
              <Panel
                header={option.title}
                className={styles.episodeSelectorOption}
                headerClass={styles.episodeSelectorOptionName}
                key={option.id}
              >
                <img
                  src={arrowUp}
                  alt="Collapse"
                  className={styles.episodeSelectorOptionCollapse}
                />
                <EpisodeSelectorMenuOption
                  option={option}
                  player={player}
                />
              </Panel>
            );
          })
        }
      </Collapse>
    </div>
  );
}

EpisodeSelectorMenu.propTypes = {
  onSelectEpisodeSelectorOption: PropTypes.func.isRequired,
  setSeasonSelectorVisibility: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    tile: PropTypes.object,
    videos: PropTypes.array,
    rating: PropTypes.object,
    duration: PropTypes.number,
    continuity: PropTypes.number,
    seasonNumber: PropTypes.number,
  })).isRequired,
  selected: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    tile: PropTypes.object,
    videos: PropTypes.array,
    rating: PropTypes.object,
    duration: PropTypes.number,
    continuity: PropTypes.number,
    seasonNumber: PropTypes.number,
  }),
  // eslint-disable-next-line react/forbid-prop-types
  player: PropTypes.object.isRequired,
};

EpisodeSelectorMenu.defaultProps = {
  selected: null,
};

export default EpisodeSelectorMenu;
