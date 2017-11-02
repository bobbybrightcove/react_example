import React from 'react';
import PropTypes from 'prop-types';
import { compose, withState, withHandlers } from 'recompose';

import styles from './icon-box.css';
import back from '../icons/back.svg';
import backHover from '../icons/back-hover.svg';

const BackIcon = ({ history, hover, onMouseEnter, onMouseLeave, screenId }) => {
  const renderIcon = hover ? backHover : back;
  return (
    <a // eslint-disable-line jsx-a11y/no-static-element-interactions
      onClick={() => {
        history.push(`/title/${screenId}`);
      }}
      className={styles.iconBox}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <img
        src={renderIcon}
        alt="Back"
      />
    </a>
  );
};

BackIcon.propTypes = {
  hover: PropTypes.bool.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  screenId: PropTypes.string.isRequired,
  history: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

BackIcon.defaultProps = {
  history: null,
};

const enhance = compose(
  withState('hover', 'setHover', false),
  withHandlers({
    onMouseEnter: ({ setHover }) => () => {
      setHover(true);
    },
    onMouseLeave: ({ setHover }) => () => {
      setHover(false);
    },
  })
);

export default enhance(BackIcon);
