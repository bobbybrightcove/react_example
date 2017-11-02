import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import play from '../icons/play.svg';
import styles from './episode-play-button.css';

import CONTENT_ITEM_FRAGMENT from '../../../../graphql/fragments/content-item.gql';

function EpisodePlayButton({ episode, player, onPlayClick }) {
  const url = `/watch/${episode.id}`;
  return (
    <div // eslint-disable-line jsx-a11y/no-static-element-interactions
      className={styles.episodeSelectorOptionPlay}
      onClick={() => onPlayClick(url, player)}
    >
      <img
        src={play}
        alt="Play"
      />
    </div>
  );
}

EpisodePlayButton.propTypes = {
  episode: propType(CONTENT_ITEM_FRAGMENT).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  player: PropTypes.object.isRequired,
  onPlayClick: PropTypes.func.isRequired,
};

export default EpisodePlayButton;
