import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import EpisodeSelectorMenu
 from '../../components/video-player/header/episode-selector-menu';
import { setEpisodeMenuVisibility, selectEpisodeSelectorOption, setEpisodeSelectorVisibility,
  setSeasonSelectorVisibility, showError } from '../../actions';

function EpisodeSelectorMenuWithData({ ...props }) {
  return (
    <EpisodeSelectorMenu
      options={props.episode}
      {...props}
    />
  );
}

EpisodeSelectorMenuWithData.propTypes = {
  episode: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    videos: PropTypes.array,
    rating: PropTypes.object,
    duration: PropTypes.number,
    continuity: PropTypes.number,
    seasonNumber: PropTypes.number,
  })),
};

EpisodeSelectorMenuWithData.defaultProps = {
  episode: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    videos: PropTypes.array,
    rating: PropTypes.object,
    duration: PropTypes.number,
    continuity: PropTypes.number,
    seasonNumber: PropTypes.number,
  })),
};

const dispatchToProps = dispatch => ({
  setEpisodeMenuVisibility: (playerId, visibility) => {
    dispatch(setEpisodeMenuVisibility(playerId, visibility));
  },
  onSelectEpisodeSelectorOption: (player, episodeSelectorOption) => {
    dispatch(selectEpisodeSelectorOption(player.id(), episodeSelectorOption));
  },
  setEpisodeSelectorVisibility: (player, visibility) => {
    dispatch(setEpisodeSelectorVisibility(player.id(), visibility));
  },
  setSeasonSelectorVisibility: (player, visibility) => {
    dispatch(setSeasonSelectorVisibility(player.id(), visibility));
  },
  onError: (msg) => {
    dispatch(showError(msg));
  },
});

const enhance = compose(
  connect(
    () => ({}),
    dispatchToProps
  )
);

export default enhance(EpisodeSelectorMenuWithData);
