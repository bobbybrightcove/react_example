import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';

import apollo from '../../../../app/lib/apollo';
import Overlay from '../../../containers/video-player/overlay';

/**
 * @param  {HTMLElement[]} containers - list of HTML elements to cleanup on unmount
 * @param  {Object} player - videojs player instance
 * @param  {Object} appStore - app redux global store
 */
export default function render(containers, player, appStore) {
  const overlayContainer = document.createElement('div');

  player.el().appendChild(overlayContainer);

  ReactDOM.render(
    <ApolloProvider store={appStore} client={apollo}>
      <Overlay player={player} />
    </ApolloProvider>,
    overlayContainer
  );

  // Make sure the container is added to the containers list
  // so it can be cleaned up on unmount
  containers.push(overlayContainer);
}
