import React from 'react';
import PropTypes from 'prop-types';

import icon from '../icons/next-episode.svg';

function NextEpisodeButton({ nextEpisodeID }) {
  return (
    <a
      href={`/watch/${nextEpisodeID}`}
    >
      <img src={icon} alt="Next Episode" />
    </a>
  );
}

NextEpisodeButton.propTypes = {
  nextEpisodeID: PropTypes.string.isRequired,
};

export default NextEpisodeButton;
