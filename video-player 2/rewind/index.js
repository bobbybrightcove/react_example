import React from 'react';
import ReactDOM from 'react-dom';

import RewindButton from './rewind-button';

/**
 * @param  {HTMLElement[]} containers - list of HTML elements to cleanup on unmount
 * @param  {Object} player - videojs player instance
 */
export default function render(containers, player) {
  const rewindContainer = document.createElement('div');
  rewindContainer.className = 'vjs-control vjs-custom-btn-img';
  rewindContainer.setAttribute('title', 'Rewind');

  const controlBar = player.el().getElementsByClassName('vjs-control-bar')[0];
  controlBar.appendChild(rewindContainer);

  ReactDOM.render(
    <RewindButton player={player} />,
    rewindContainer
  );

  // Make sure the container is added to the containers list
  // so it can be cleaned up on unmount
  containers.push(rewindContainer);
}
