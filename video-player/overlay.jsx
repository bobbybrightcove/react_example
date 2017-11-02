import { connect } from 'react-redux';
import { compose } from 'recompose';
import { path } from 'ramda';

import Overlay
 from '../../components/video-player/overlay/overlay';

const mapStateToProps = (state, { player }) => {
  const getOverlayVisibility = path(['players', player.id(), 'overlay']);

  const visibility = getOverlayVisibility(state) || false;

  return {
    visibility,
  };
};

const enhance = compose(
  connect(
    mapStateToProps,
    () => ({})
  )
);

export default enhance(Overlay);
