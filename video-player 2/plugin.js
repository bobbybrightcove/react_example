import renderRewind from './rewind';
import renderHeader from './header';
import renderOverlay from './overlay';
import renderNextEpisode from './next-episode';
import { isMobile } from '../../lib/utils';

// detect if controls are displaying
function isUserInactive(controlBar) {
  return (controlBar.className.indexOf('vjs-user-inactive') !== -1);
}

function initPlayerControlsVisibility(player, playerControlsIntervals) {
  const CONTROLS_TIME = 5000; // time on milliseconds
  let userActivity = true;
  let inactivityTimeout;
  let inactivityMobileTimeout;
  const controlBar = player.el().getElementsByClassName('vjs-control-bar')[0];

  player.on('mousemove', () => {
    userActivity = true;
  });

  player.on('touchstart', () => {
    if (!isUserInactive(controlBar)) {
      controlBar.className += ' vjs-user-inactive'; // hide controls
    } else {
      controlBar.className = 'vjs-control-bar'; // display controls and set timeout to hide after 5 seconds
      clearTimeout(inactivityMobileTimeout);
      inactivityMobileTimeout = setTimeout(() => {
        if (!isUserInactive(controlBar)) {
          controlBar.className += ' vjs-user-inactive';
          player.userActive(false);
        }
      }, CONTROLS_TIME);
    }
  });

  const interval = setInterval(() => {
    // Check to see if the mouse has been moved
    if (userActivity) {
      // Reset the activity tracker
      userActivity = false;

      // If the user state was inactive, set the state to active
      if (player.userActive() === false) {
        player.userActive(true);
      }

      // Clear any existing inactivity timeout to start the timer over
      clearTimeout(inactivityTimeout);

      // In X seconds, if no more activity has occurred
      // the user will be considered inactive
      inactivityTimeout = setTimeout(() => {
        // Protect against the case where the inactivity timeout can trigger
        // before the next user activity is picked up  by the
        // activityCheck loop.
        if (!userActivity) {
          player.userActive(false);
        }
      }, CONTROLS_TIME);
    }
    clearTimeout(inactivityTimeout);
  }, 1000);

  if (!isMobile()) {
    playerControlsIntervals.push(interval);
  }
}

function plugin(htmlContainers, appStore, options) {
  const player = this;
  initPlayerControlsVisibility(player, options.playerControlsIntervals);
  renderRewind(options.htmlContainers, player);
  renderHeader(options.htmlContainers, player, appStore, options.contentItem);
  renderOverlay(options.htmlContainers, player, appStore);
  renderNextEpisode(options.htmlContainers, player, options.contentItem);
}

/**
 * @param {Object} player - videojs player instance
 * @param {Object} appStore - application redux global state object
 * @param {Object} options
 * @param {Object} options.licensedContent - licensed content to be displayed
 * @param {HTMLElement[]} options.htmlContainers - list of HTML elements to cleanup on unmount
 * @param {Object[]} options.playerControlsIntervals - list of setInterval functions
 */
export default function initPlugin(player, appStore, options) {
  window.videojs.plugin(plugin.name, plugin);
  window.videojs(player)[plugin.name](options.htmlContainers, appStore, options);
}
