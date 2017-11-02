import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ConnectedRouter } from 'connected-react-router';

import apollo from '../../../../app/lib/apollo';
import Header from './header';
import styles from './index.css';
import { history } from '../../../store';

/**
 * @param  {HTMLElement[]} containers - list of HTML elements to cleanup on unmount
 * @param  {Object} player - videojs player instance
 * @param  {Object} appStore - app redux global store
 * @param  {String} contentItem - contentItem to be displayed
 */
export default function render(containers, player, appStore, contentItem) {
  const headerContainer = document.createElement('div');
  headerContainer.className = `${styles.headerWrapper} headerContainer`;

  player.el().appendChild(headerContainer);

  ReactDOM.render(
    <ApolloProvider store={appStore} client={apollo}>
      <ConnectedRouter history={history}>
        <Header player={player} contentItem={contentItem} />
      </ConnectedRouter>
    </ApolloProvider>,
    headerContainer
  );

  // Make sure the container is added to the containers list
  // so it can be cleaned up on unmount
  containers.push(headerContainer);
}
