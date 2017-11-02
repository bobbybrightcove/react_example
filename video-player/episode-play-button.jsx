import React from 'react';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import EpisodePlayButton from '../../components/video-player/header/episode-play-button';
import { setEpisodeMenuVisibility } from '../../actions';

const EpisodePlayButtonContainer = ({ ...props }) => {
  return (
    <EpisodePlayButton
      {...props}
    />
  );
};

const enhance = compose(
  withRouter,
  connect(
    dispatch => ({
      dispatch,
    })
  ),
  withHandlers({
    onPlayClick: ({ history, dispatch }) => (url, player) => {
      history.push(url);
      dispatch(setEpisodeMenuVisibility(player.id(), false));
    },
  })
);

export default enhance(EpisodePlayButtonContainer);
