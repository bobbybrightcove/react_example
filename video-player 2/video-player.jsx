import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { path } from 'ramda';

import initPlugin from './plugin';
import { PLAYER } from '../../constants';
import { getVideoId } from '../../lib/player';
import styles from './video-player.css';
import './bcplayer.css';

import CONTENT_ITEM_FRAGMENT from '../../../graphql/fragments/content-item.gql';

class VideoPlayer extends React.PureComponent {
  componentDidMount() {
    // Keep a list of all react root containers
    // to clean up on componentWillUnmount
    this.containers = [];

    // Keep a list of setIntervals
    // to clean up on componentWillUnmount
    this.playerControlsIntervals = [];

    // This component should be mounted only after ensuring
    // brightcove player <script> was loaded
    this.initPlayer();
  }

  componentWillUnmount() {
    // A good practice to dispose the initialized player
    // since the player is being dynamically loaded
    window.videojs(this.video).dispose();

    // Unmount all React root components mounted inside the player,
    // avoiding react component leaks
    this.containers.forEach((container) => {
      ReactDOM.unmountComponentAtNode(container);
    });

    // Dispatch a cleanup action to remove player from state
    this.props.cleanupPlayer(this.playerId);

    // Clear all player intervals
    this.playerControlsIntervals.forEach((interval) => {
      clearInterval(interval);
    });
  }

  initPlayer() {
    const appStore = this.context.store;
    // Brightcove video player initialization
    window.bc(this.video);

    // Brightcove video player plugin initialization
    // Where custom controls are added
    const playerOptions = {
      appStore,
      contentItem: this.props.contentItem,
      htmlContainers: this.containers,
      playerControlsIntervals: this.playerControlsIntervals,
    };
    initPlugin(this.video, appStore, playerOptions);

    // Store playerId so it can be used in cleanup
    this.playerId = path(['parentNode', 'id'], this.video);
  }

  render() {
    const contentItem = this.props.contentItem;
    const videoId = this.props.videoId;
    const accountId = this.props.accountId;

    return (
      <div className={styles.playerWrapper}>
        <div className={styles.playerRatioWrapper}>
          <video
            ref={(videoTag) => { this.video = videoTag; }}
            data-application-id={PLAYER.APPLICATION_ID}
            data-video-id={videoId || getVideoId(contentItem)}
            data-account={accountId}
            data-player="default"
            data-embed="default"
            className={styles.player}
            controls
          />
        </div>
      </div>
    );
  }
}

VideoPlayer.contextTypes = {
  store: PropTypes.object,
};

VideoPlayer.propTypes = {
  contentItem: propType(CONTENT_ITEM_FRAGMENT).isRequired,
  accountId: PropTypes.string.isRequired,
  videoId: PropTypes.string,
  cleanupPlayer: PropTypes.func.isRequired,
};

VideoPlayer.defaultProps = {
  videoId: undefined,
};

export default VideoPlayer;
