import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { connect } from 'react-redux';
import { compose, branch, renderNothing } from 'recompose';
import { graphql } from 'react-apollo';
import { path } from 'ramda';

import DataSaverIcon from '../../components/video-player/header/data-saver-icon';
import { checkIsAuthenticated } from '../../lib/auth';
import { setDataSaverVisibility } from '../../actions';
import { selectSource } from '../../lib/player';

import PLAYBACK_QUALITY_OPTION from '../../../graphql/fragments/playback-quality-option.gql';
import ACCOUNT_QUERY from '../../../graphql/queries/account.gql';
import ACCOUNT_FRAGMENT from '../../../graphql/fragments/account.gql';

class DataSaverIconWithData extends React.PureComponent {
  componentDidMount() {
    const getPlaybackQuality = path(['account', 'playbackQuality']);
    const playbackQuality = getPlaybackQuality(this.props.accountQuery);

    // Player will use built int automatic playlist selection
    // if no preference was set on account settings
    if (!playbackQuality) {
      return;
    }

    selectSource(this.props.player, playbackQuality);
  }

  render() {
    const { accountQuery, selected, ...props } = this.props;
    const preselected = accountQuery ?
      accountQuery.account.playbackQuality.wifi :
      selected;

    return (
      <DataSaverIcon
        preSelected={preselected}
        {...props}
      />
    );
  }
}


DataSaverIconWithData.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  player: PropTypes.object.isRequired,
  selected: propType(PLAYBACK_QUALITY_OPTION).isRequired,
  accountQuery: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.object,
    account: propType(ACCOUNT_FRAGMENT),
  }),
};

DataSaverIconWithData.defaultProps = {
  accountQuery: undefined,
};

const mapStateToProps = (state, { player }) => {
  const getVisibility = path(['players', player.id(), 'dataSaver', 'visibility']);
  const getOptionSelected = path(['user', 'account', 'dataSaver']);
  const isAuthenticated = checkIsAuthenticated(state);

  const selected = getOptionSelected(state);
  const menuVisibility = getVisibility(state) || false;

  return {
    selected,
    menuVisibility,
    isAuthenticated, // used to skip account query
  };
};

const enhance = compose(
  connect(
    mapStateToProps,
    dispatch => ({
      setDataSaverVisibility: (playerId, visibility) => {
        dispatch(setDataSaverVisibility(playerId, visibility));
      },
    })
  ),
  // Account query is skipped if user is not authenticated
  graphql(ACCOUNT_QUERY, {
    name: 'accountQuery',
    skip: ownProps => !ownProps.isAuthenticated,
  }),
  branch(
    ({ accountQuery }) => (accountQuery && (accountQuery.loading || accountQuery.error)),
    renderNothing
  )
);

export default enhance(DataSaverIconWithData);
