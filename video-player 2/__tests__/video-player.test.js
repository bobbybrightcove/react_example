
import React from 'react';
import renderer from 'react-test-renderer';
import VideoPlayer from '../video-player';

import contentItem from './content-item.json';

function setVideoJsPolyfills() {
  // Create initial videojs methods
  const videojsMethods = { ready: jest.fn() };
  // Create videojs mock function
  const videojs = jest.fn(() => (videojsMethods));
  // create video js plugin mock function implementation
  videojs.plugin = jest.fn().mockImplementation((name) => {
    videojsMethods[name] = jest.fn();
  });
  // set videojs polyfills in global scope
  global.window = {
    bc: jest.fn(),
    videojs,
  };
}

describe('VideoPlayer', () => {
  // Mocking videojs functions
  beforeAll(() => {
    setVideoJsPolyfills();
  });

  afterAll(() => jest.resetAllMocks());

  it('renders according to valid snapshot', () => {
    const component = renderer.create(
      <VideoPlayer
        playbackQuality={{
          mobile: 'MEDIUM',
          wifi: 'MEDIUM',
        }}
        contentItem={contentItem}
        cleanupPlayer={jest.fn()}
        accountId="account_id"
      />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a video tag with correct attributes', () => {
    const component = renderer.create(
      <VideoPlayer
        playbackQuality={{
          mobile: 'MEDIUM',
          wifi: 'MEDIUM',
        }}
        contentItem={contentItem}
        cleanupPlayer={jest.fn()}
        accountId="account_id"
      />
    );

    const tree = component.toJSON();
    const videoTag = tree.children[0].children[0];
    expect(videoTag.type).toBe('video');
    expect(videoTag.props['data-video-id']).toBe('5419485997001');
  });

  it('calls videojs functions when mounting', () => {
    global.window.bc.mockClear();
    global.window.videojs.mockClear();

    renderer.create(
      <VideoPlayer
        playbackQuality={{
          mobile: 'MEDIUM',
          wifi: 'MEDIUM',
        }}
        contentItem={contentItem}
        cleanupPlayer={jest.fn()}
        accountId="account_id"
      />
    );

    expect(global.window.bc).toHaveBeenCalled();
    expect(global.window.videojs).toHaveBeenCalled();
  });
});
