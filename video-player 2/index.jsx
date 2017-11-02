import { compose, branch, renderNothing } from 'recompose';
import scriptLoader from 'react-async-script-loader';

import VideoPlayer from './video-player';
import { getPlayerJSUrl } from '../../lib/utils';

/**
 * @param  {string} videoCloudAccountId
 * @param  {string} videoCloudPlayerId
 */
export default function getVideoPlayer(videoCloudAccountId, videoCloudPlayerId) {
  // Get video cloud player url
  const url = getPlayerJSUrl(videoCloudAccountId, videoCloudPlayerId);

  // VideoPlayer is rendered only when async script loading is completed successfully
  return compose(
    scriptLoader(url),
    branch(
      props => !props.isScriptLoadSucceed,
      renderNothing
    )
  )(VideoPlayer);
}
