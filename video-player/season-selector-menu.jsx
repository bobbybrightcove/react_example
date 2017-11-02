import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import SeasonSelectorMenu
 from '../../components/video-player/header/season-selector-menu';
import { selectSeasonSelectorOption, selectEpisodeSelectorOption, showError } from '../../actions';

function SeasonSelectorMenuWithData({ ...props }) {
  return (
    <SeasonSelectorMenu
      options={props.seasons}
      {...props}
    />
  );
}

SeasonSelectorMenuWithData.propTypes = {
  seasons: PropTypes.arrayOf(PropTypes.object),
};

SeasonSelectorMenuWithData.defaultProps = {
  seasons: PropTypes.arrayOf(PropTypes.object),
};

const dispatchToProps = dispatch => ({
  onSelectSeasonSelectorOption: (player, seasonSelectorOption) => {
    dispatch(selectSeasonSelectorOption(player.id(), seasonSelectorOption));
    // set the first episode in the season as selected
    dispatch(selectEpisodeSelectorOption(player.id(), seasonSelectorOption.episodes[0]));
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

export default enhance(SeasonSelectorMenuWithData);
