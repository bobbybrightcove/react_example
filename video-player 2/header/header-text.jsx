import React from 'react';
import PropTypes from 'prop-types';

import styles from './header-text.css';

function HeaderText({ title }) {
  return (
    <div className={styles.headerText}>
      <p>{title}</p>
    </div>
  );
}

HeaderText.propTypes = {
  title: PropTypes.string.isRequired,
};

export default HeaderText;
