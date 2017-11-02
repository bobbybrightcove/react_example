import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.css';
import uncheckedIcon from '../icons/checkbox-unchecked.svg';
import checkedIcon from '../icons/checkbox-checked.svg';

function Checkbox({ isChecked }) {
  const icon = isChecked ? checkedIcon : uncheckedIcon;
  return (
    <div className={styles.checkboxWrapper}>
      <img src={icon} alt={isChecked} />
    </div>
  );
}

Checkbox.propTypes = {
  isChecked: PropTypes.bool.isRequired,
};

export default Checkbox;
