import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import DataSaverIcon from '../../../containers/video-player/data-saver';
import BackIcon from '../../../containers/video-player/back';
import HeaderText from './header-text';
import EpisodeSelector from '../../../containers/video-player/episode-selector';
import { getBackButtonId } from '../../../lib/player';
import styles from './header.css';

import CONTENT_ITEM_FRAGMENT from '../../../../graphql/fragments/content-item.gql';

function Header({ player, contentItem }) {
  const isEpisode = contentItem.__typename === 'Episode';
  const backScreenId = getBackButtonId(contentItem);
  const getTitle = () => {
    if (contentItem.__typename === 'Episode') {
      return contentItem.series.title;
    }
    return contentItem.title;
  };

  return (
    <div>
      <div className={styles.headerLeft}>
        <BackIcon screenId={backScreenId} />
        <HeaderText title={getTitle()} />
        {
          isEpisode ?
            <EpisodeSelector player={player} episode={contentItem} /> :
          null
        }
      </div>
      <div className={styles.headerRight}>
        <DataSaverIcon
          player={player}
        />
      </div>
    </div>
  );
}

Header.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  player: PropTypes.object.isRequired,
  contentItem: propType(CONTENT_ITEM_FRAGMENT).isRequired,
};

export default Header;
