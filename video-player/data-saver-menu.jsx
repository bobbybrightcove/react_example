import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { compose, branch, renderNothing } from 'recompose';

import DataSaverMenu
  from '../../components/video-player/header/data-saver-menu';
import { checkIsAuthenticated } from '../../lib/auth';
import { selectSource } from '../../lib/player';
import { selectDataSaverOption, showError } from '../../actions';


import CONFIG_QUERY from '../../../graphql/queries/config.gql';
import ACCOUNT_QUERY from '../../../graphql/queries/account.gql';
import ACCOUNT_MUTATION from '../../../graphql/mutations/account.gql';
import CONFIG_FRAGMENT from '../../../graphql/fragments/config.gql';

function DataSaverMenuWithData({ configQuery, ...props }) {
  return (
    <DataSaverMenu
      options={configQuery.config.playbackQualityOptions.wifi}
      {...props}
    />
  );
}


DataSaverMenuWithData.propTypes = {
  configQuery: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.object,
    config: propType(CONFIG_FRAGMENT),
  }).isRequired,
};


// Create props from global state
const mapStateToProps = (state) => {
  return {
    authenticated: checkIsAuthenticated(state),
  };
};

// Create props that dispatch actions
const mapDispatchToProps = (dispatch) => {
  return {
    onSelectDataSaverOption: (player, dataSaverOption) => {
      // Perform media/playlist selection
      selectSource(player, dataSaverOption);

      // Dispatch selected data saver action
      dispatch(selectDataSaverOption(player.id(), dataSaverOption));
    },
    onError: (msg) => {
      dispatch(showError(msg));
    },
  };
};

// Create props that dispatch actions that use props from mapStateToProps or mapDispatchToProps
// and may override previously set props
// documentation here: https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
// In this case, onSelectDataSaverOption is overridden to use `authenticated` prop
const mergeProps = (
  { authenticated, ...stateProps }, // stateProps
  { onSelectDataSaverOption, ...dispatchProps }, // dispatchProps
  { mutate, ...ownProps } // ownProps
) => {
  return {
    ...stateProps,
    ...ownProps,
    ...dispatchProps,
    onSelectDataSaverOption: (player, dataSaverOption) => {
      // Account mutation to persist playback quality selected option
      if (authenticated) {
        mutate({
          variables: {
            input: {
              playbackQuality: {
                wifi: dataSaverOption.id,
              },
            },
          },
          refetchQueries: [{
            query: ACCOUNT_QUERY,
          }],
        });
      }

      onSelectDataSaverOption(player, dataSaverOption);
    },
  };
};

const enhance = compose(
  graphql(CONFIG_QUERY, {
    name: 'configQuery',
  }),
  graphql(ACCOUNT_MUTATION),
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  ),
  branch(
    ({ configQuery }) => configQuery.loading,
    renderNothing
  )
);

export default enhance(DataSaverMenuWithData);
