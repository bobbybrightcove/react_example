import React from 'react';
import ReactDOM from 'react-dom';
import { getNextEpisodeId } from '../../../lib/player';

import NextEpisodeButton from './next-episode-button';

/**
 * @param  {HTMLElement[]} containers - list of HTML elements to cleanup on unmount
 * @param  {Object} player - videojs player instance
 * @param  {String} contentItem - contentItem to be displayed
 */
export default function render(containers, player, contentItem) {
  const nextEpisodeID = getNextEpisodeId(contentItem);
  if (!nextEpisodeID) { return; }

  const nextEpisodeContainer = document.createElement('div');
  nextEpisodeContainer.className = 'vjs-control vjs-custom-btn-img right-control';
  nextEpisodeContainer.setAttribute('title', 'Next Episode');

  // Get the spacer element
  const spacer = player.controlBar.customControlSpacer.el();
  spacer.appendChild(nextEpisodeContainer);
  // Set the content of the spacer to be right justified
  spacer.setAttribute('style', 'justify-content: flex-end;');

  ReactDOM.render(
    <NextEpisodeButton player={player} nextEpisodeID={nextEpisodeID} />,
    nextEpisodeContainer
  );

  // Make sure the container is added to the containers list
  // so it can be cleaned up on unmount
  containers.push(nextEpisodeContainer);
}
