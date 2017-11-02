import React from 'react';
import PropTypes from 'prop-types';

import rewind from './rewind';
import icon from '../icons/rewind.svg';

function RewindButton({ player }) {
  const onClick = () => {
    const currentTime = player.currentTime();
    const newTime = rewind(currentTime);
    player.currentTime(newTime);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <img src={icon} onClick={onClick} alt="Rewind" />
  );
}

RewindButton.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  player: PropTypes.object.isRequired,
};

export default RewindButton;
