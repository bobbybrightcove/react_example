import React from 'react';
import PropTypes from 'prop-types';

import styles from './season-selector.css';
import next from '../icons/next.svg';

function SeasonSelectorMenuOption({ option, isSelected, onClick }) {
  const selectedClass = isSelected ? styles.selected : '';
  return (
    <div // eslint-disable-line jsx-a11y/no-static-element-interactions
      className={` ${styles.seasonSelectorOption} ${selectedClass}`}
      onClick={onClick}
    >
      <div className={styles.seasonSelectorOptionName}>
        {`Season ${option.seasonNumber}`}
      </div>
      <img
        src={next}
        alt="Next"
      />
    </div>
  );
}

SeasonSelectorMenuOption.propTypes = {
  isSelected: PropTypes.bool,
  option: PropTypes.shape({
    id: PropTypes.string,
    seasonNumber: PropTypes.number,
    episodes: PropTypes.array,
  }),
  onClick: PropTypes.func.isRequired,
};

SeasonSelectorMenuOption.defaultProps = {
  isSelected: false,
  option: null,
};

export default SeasonSelectorMenuOption;
