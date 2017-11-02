import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from '../checkbox';
import styles from './data-saver.css';

function DataSaverMenuOption({ option, isSelected, onClick }) {
  return (
    <div // eslint-disable-line jsx-a11y/no-static-element-interactions
      className={styles.dataSaverOption}
      onClick={onClick}
    >
      <div className={styles.dataSaverOptionLeft}>
        <div className={styles.dataSaverOptionName}>
          { option.label }
        </div>
        <div className={styles.dataSaverOptionDesc}>
          { option.description }
        </div>
      </div>
      <div className={styles.dataSaverOptionRight}>
        <Checkbox isChecked={isSelected} />
      </div>
    </div>
  );
}

DataSaverMenuOption.propTypes = {
  isSelected: PropTypes.bool,
  option: PropTypes.shape({
    label: PropTypes.string,
    description: PropTypes.string,
    bitrate: PropTypes.number,
  }),
  onClick: PropTypes.func.isRequired,
};

DataSaverMenuOption.defaultProps = {
  isSelected: false,
  option: {
    label: 'SD',
    description: 'Standard Definition - up to 1 GB per hour.',
  },
};

export default DataSaverMenuOption;
