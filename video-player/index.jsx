import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { graphql } from 'react-apollo';
import { compose, branch, renderNothing } from 'recompose';

import getVideoPlayer from '../../components/video-player';
import { showError, cleanupPlayer } from '../../actions';

import CONFIG_QUERY from '../../../graphql/queries/config.gql';
import CONFIG_FRAGMENT from '../../../graphql/fragments/config.gql';
import CONTENT_ITEM_QUERY from '../../../graphql/queries/content-item.gql';
import CONTENT_ITEM_FRAGMENT from '../../../graphql/fragments/content-item.gql';

class VideoPlayerWithData extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.configQuery.error) {
      this.props.onError(nextProps.configQuery.error.message);
    }
    if (nextProps.contentItemQuery.error) {
      this.props.onError(nextProps.contentItemQuery.error.message);
    }
  }

  render() {
    const configQuery = this.props.configQuery;
    const contentItemQuery = this.props.contentItemQuery;

    if (configQuery.error || contentItemQuery.error) {
      return null;
    }

    const AsyncVideoPlayer = getVideoPlayer(
      configQuery.config.videoPlayer.videoCloudAccountId,
      configQuery.config.videoPlayer.videoCloudPlayerId
    );

    return (
      <AsyncVideoPlayer
        videoId={this.props.videoId}
        accountId={configQuery.config.videoPlayer.videoCloudAccountId}
        contentItem={contentItemQuery.contentItem}
        cleanupPlayer={this.props.cleanupPlayer}
      />
    );
  }
}

VideoPlayerWithData.propTypes = {
  onError: PropTypes.func.isRequired,
  configQuery: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.object,
    config: propType(CONFIG_FRAGMENT),
  }).isRequired,
  contentItemQuery: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.object,
    contentItem: propType(CONTENT_ITEM_FRAGMENT),
  }).isRequired,
  videoId: PropTypes.string,
  cleanupPlayer: PropTypes.func.isRequired,
};

VideoPlayerWithData.defaultProps = {
  videoId: undefined,
};

export default compose(
  graphql(CONTENT_ITEM_QUERY, {
    name: 'contentItemQuery',
    options: ({ match }) => ({
      variables: {
        id: match.params.contentId,
      },
    }),
  }),
  graphql(CONFIG_QUERY, { name: 'configQuery' }),
  connect(
    (state, { match }) => {
      return {
        videoId: match && match.params.videoId,
      };
    },
    dispatch => ({
      onError: (msg) => {
        dispatch(showError(msg));
      },
      cleanupPlayer: (playerId) => {
        dispatch(cleanupPlayer(playerId));
      },
    })
  ),
  branch(
    props => (props.configQuery && props.configQuery.loading)
      || (props.contentItemQuery && props.contentItemQuery.loading),
    renderNothing
  )
)(VideoPlayerWithData);
