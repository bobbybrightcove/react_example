import React from 'react';
import PropTypes from 'prop-types';
import { compose, withState, withHandlers } from 'recompose';
import ClickOutside from 'react-click-outside';

import DataSaverMenu from '../../../containers/video-player/data-saver-menu';
import styles from './data-saver.css';
import hd from '../icons/data-saver-hd.svg';
import hdHover from '../icons/data-saver-hd-hover.svg';
import sd from '../icons/data-saver-sd.svg';
import sdHover from '../icons/data-saver-sd-hover.svg';
import saver from '../icons/data-saver-saver.svg';
import saverHover from '../icons/data-saver-saver-hover.svg';

const icons = {
  hd: {
    icon: hd,
    hover: hdHover,
  },
  sd: {
    icon: sd,
    hover: sdHover,
  },
  saver: {
    icon: saver,
    hover: saverHover,
  },
};

function getIconLabel(selectedOption) {
  const label = Object.keys(icons).includes(selectedOption.label.toLowerCase()) ? selectedOption.label.toLowerCase() : 'hd';
  return label.toLowerCase();
}

const DataSaverIcon = ({
  player,
  menuVisibility,
  preSelected,
  selected,
  hover,
  onMouseEnter,
  onMouseLeave,
  onClick,
  onClickOutside,
}) => {
  const selectedOption = (selected && selected.label) ? selected : preSelected;
  const iconLabel = getIconLabel(selectedOption);
  const renderIcon = hover || menuVisibility ? icons[iconLabel].hover : icons[iconLabel].icon;

  return (
    <div className={styles.dataSaverWrapper}>
      <div // eslint-disable-line jsx-a11y/no-static-element-interactions
        className={styles.dataSaverIconBox}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        <img
          src={renderIcon}
          alt="Data Saver"
        />
      </div>
      {
        menuVisibility ?
          <div className={styles.dataSaverMenuWrapper}>
            <ClickOutside
              onClickOutside={onClickOutside}
            >
              <DataSaverMenu
                player={player}
                selected={selectedOption}
              />
            </ClickOutside>
          </div> :
          null
      }
    </div>
  );
};

DataSaverIcon.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  player: PropTypes.object.isRequired,
  menuVisibility: PropTypes.bool,
  preSelected: PropTypes.shape({
    label: PropTypes.string,
    description: PropTypes.string,
    bitrate: PropTypes.number,
  }),
  selected: PropTypes.shape({
    label: PropTypes.string,
    description: PropTypes.string,
    bitrate: PropTypes.number,
  }),
  hover: PropTypes.bool.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onClickOutside: PropTypes.func.isRequired,
};

DataSaverIcon.defaultProps = {
  menuVisibility: false,
  preSelected: { label: 'HD' },
  selected: {},
};

const enhance = compose(
  withState('hover', 'setHover', false),
  withHandlers(() => (
    {
      onMouseEnter: ({ setHover }) => () => {
        setHover(true);
      },
      onMouseLeave: ({ setHover }) => () => {
        setHover(false);
      },
      onClick: ({ player, setDataSaverVisibility, menuVisibility }) => () => {
        setDataSaverVisibility(player.id(), !menuVisibility);
      },
      onClickOutside: ({ player, setDataSaverVisibility }) => (event) => {
        const targetClass = event.target.className || '';
        const targetParentClass = (event.target.parentNode && event.target.parentNode.className) || '';
        // If data saver icon was clicked
        if (
          targetClass === styles.dataSaverIconBox
          || targetParentClass === styles.dataSaverIconBox
        ) {
          // do nothing
          return;
        }
        setDataSaverVisibility(player.id(), false);
      },
    }
  ))
);

export default enhance(DataSaverIcon);
