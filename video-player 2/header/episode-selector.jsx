import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { compose, withHandlers } from 'recompose';
import ClickOutside from 'react-click-outside';

import EpisodeSelectorMenu from '../../../containers/video-player/episode-selector-menu';
import SeasonSelectorMenu from '../../../containers/video-player/season-selector-menu';
import styles from './episode-selector.css';
import arrowDown from '../icons/yellow-arrow-down.svg';
import arrowUp from '../icons/yellow-arrow-up.svg';

import CONTENT_ITEM_FRAGMENT from '../../../../graphql/fragments/content-item.gql';

const EpisodeSelector = ({
  episode,
  player,
  episodeMenuVisibility,
  episodeSelectorVisibility,
  seasonSelectorVisibility,
  preSelected,
  selected,
  onClick,
  onClickOutside,
}) => {
  const renderIcon = episodeMenuVisibility ? arrowUp : arrowDown;
  const selectedOption = (selected && selected.id) ? selected : preSelected;
  const selectorLabel = `S${episode.seasonNumber}.E${episode.episodeNumber}`;

  const seasonNumber = selectedOption.seasonNumber - 1;
  return (
    <div className={styles.episodeSelectorWrapper}>
      <div // eslint-disable-line jsx-a11y/no-static-element-interactions
        className={styles.episodeSelectorBox}
        onClick={onClick}
      >
        <div className={styles.episodeSelectorText}>
          {selectorLabel}
          <img
            src={renderIcon}
            alt="Episodes"
          />
        </div>
      </div>
      {
        episodeMenuVisibility ?
          <div className={styles.episodeSelectorMenuWrapper}>
            <ClickOutside
              onClickOutside={onClickOutside}
            >
              {
                episodeSelectorVisibility ?
                  <EpisodeSelectorMenu
                    episode={episode.series.seasons[seasonNumber].episodes}
                    player={player}
                    selected={selectedOption}
                  /> :
                null
              }
              {
                seasonSelectorVisibility ?
                  <SeasonSelectorMenu
                    className={styles.seasonSelectorMenuWrapper}
                    seasons={episode.series.seasons}
                    player={player}
                    selected={selectedOption}
                  /> :
                  null
              }
            </ClickOutside>
          </div> :
          null
      }
    </div>
  );
};

EpisodeSelector.propTypes = {
  episode: propType(CONTENT_ITEM_FRAGMENT).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  player: PropTypes.object.isRequired,
  episodeMenuVisibility: PropTypes.bool,
  episodeSelectorVisibility: PropTypes.bool,
  seasonSelectorVisibility: PropTypes.bool,
  preSelected: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    rating: PropTypes.object,
    duration: PropTypes.number,
    continuity: PropTypes.number,
  }),
  selected: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    rating: PropTypes.object,
    duration: PropTypes.number,
    continuity: PropTypes.number,
  }),
  onClick: PropTypes.func.isRequired,
  onClickOutside: PropTypes.func.isRequired,
};

EpisodeSelector.defaultProps = {
  episodeMenuVisibility: false,
  episodeSelectorVisibility: false,
  seasonSelectorVisibility: false,
  preSelected: {
    id: null,
  },
  selected: {
    id: null,
  },
};

const enhance = compose(
  withHandlers(() => (
    {
      onClick: ({ player, setEpisodeMenuVisibility, episodeMenuVisibility }) => () => {
        setEpisodeMenuVisibility(player, !episodeMenuVisibility);
      },
      onClickOutside: ({ player, setEpisodeMenuVisibility }) => (event) => {
        const targetClass = event.target.className || '';
        const targetParentClass = (event.target.parentNode && event.target.parentNode.className) || '';
        // If episode selector was clicked
        if (
          targetClass === styles.episodeSelectorBox
          || targetParentClass === styles.episodeSelectorBox
        ) {
          // do nothing
          return;
        }
        setEpisodeMenuVisibility(player, false);
      },
    }
  ))
);

export default enhance(EpisodeSelector);
