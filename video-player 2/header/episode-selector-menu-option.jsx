import React from 'react';
import PropTypes from 'prop-types';
import { Circle } from 'rc-progress';
import { pathOr } from 'ramda';

import EpisodePlayButton from '../../../containers/video-player/episode-play-button';
import { getDurationTextFromMinutes } from '../../../lib/utils';
import styles from './episode-selector.css';
import { SERIES_CONFIG } from '../../../constants';

function EpisodeSelectorMenuOption({ option, player }) {
  const percent = (option.continuity && option.continuity > 0) ?
    ((option.continuity * 100) / option.duration) : 0;

  const imageUri = pathOr('', ['images', '0', 'uri'])(option);
  return (
    <div className={styles.episodeSelectorOptionDetail}>
      {
        option.upcoming ?
          <div className={styles.upcomingEpisode}>
            <span>{SERIES_CONFIG.comingSoonEpisode}</span>
          </div>
        :
          <div className={styles.episodeSelectorOptionImage}>
            <img src={imageUri} alt={option.title} />
            <EpisodePlayButton episode={option} player={player} />
            <Circle
              percent={percent}
              trailWidth="4"
              strokeWidth="4"
              trailColor="rgba(255,255,255,0.3)"
              strokeColor="#FFD500"
              className={styles.episodeSelectorOptionProgress}
            />
          </div>
      }
      <div className={styles.episodeSelectorOptionDesc}>
        <div className={styles.episodeSelectorOptionMetadata}>
          <span className={styles.episodeSelectorOptionRating}>{option.rating.rating}</span>
          <span className={styles.episodeSelectorOptionDuration}>
            {getDurationTextFromMinutes(option.duration)}
          </span>
        </div>
        <div>{ option.description }</div>
      </div>
    </div>
  );
}

EpisodeSelectorMenuOption.propTypes = {
  option: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    tile: PropTypes.object,
    rating: PropTypes.object,
    duration: PropTypes.number,
    continuity: PropTypes.number,
  }),
  // eslint-disable-next-line react/forbid-prop-types
  player: PropTypes.object.isRequired,
};

EpisodeSelectorMenuOption.defaultProps = {
  option: null,
};

export default EpisodeSelectorMenuOption;
