import React from 'react';
import { compose, branch, renderNothing } from 'recompose';

import styles from './overlay.css';

function Overlay() {
  return <div className={styles.overlay} />;
}

const enhance = compose(
  branch(({ visibility }) => {
    return !visibility;
  }, renderNothing)
);

export default enhance(Overlay);
