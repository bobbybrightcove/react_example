import React from 'react';
import { propType } from 'graphql-anywhere';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { path } from 'ramda';

import EpisodeSelector
 from '../../components/video-player/header/episode-selector';
import { setEpisodeMenuVisibility, setEpisodeSelectorVisibility, setSeasonSelectorVisibility } from '../../actions';

import EPISODE_FRAGMENT from '../../../graphql/fragments/episode.gql';

function EpisodeSelectorWithData({ ...props }) {
  const preselected =
    Object.assign(
      {},
      props.episode,
      { id: props.episode.id }
    );

  return (
    <EpisodeSelector
      preSelected={preselected}
      {...props}
    />
  );
}

EpisodeSelectorWithData.propTypes = {
  episode: propType(EPISODE_FRAGMENT).isRequired,
};

const mapStateToProps = (state, { player }) => {
  const getEpisodeMenuVisibility = path(['players', player.id(), 'episodeMenu', 'visibility']);
  const getEpisodeSelectorVisibility = path(['players', player.id(), 'episodeSelector', 'visibility']);
  const getSeasonSelectorVisibility = path(['players', player.id(), 'seasonSelector', 'visibility']);
  const getOptionSelected = path(['players', player.id(), 'episodeSelector', 'selected']);
  const selected = getOptionSelected(state);
  const episodeMenuVisibility = getEpisodeMenuVisibility(state) || false;
  const episodeSelectorVisibility = getEpisodeSelectorVisibility(state) || false;
  const seasonSelectorVisibility = getSeasonSelectorVisibility(state) || false;

  return {
    selected,
    episodeMenuVisibility,
    episodeSelectorVisibility,
    seasonSelectorVisibility,
  };
};

const enhance = compose(
  connect(
    mapStateToProps,
    dispatch => ({
      setEpisodeMenuVisibility: (player, visibility) => {
        dispatch(setEpisodeMenuVisibility(player.id(), visibility));
      },
      setEpisodeSelectorVisibility: (player, visibility) => {
        dispatch(setEpisodeSelectorVisibility(player.id(), visibility));
      },
      setSeasonSelectorVisibility: (player, visibility) => {
        dispatch(setSeasonSelectorVisibility(player.id(), visibility));
      },
    })
  )
);

export default enhance(EpisodeSelectorWithData);
