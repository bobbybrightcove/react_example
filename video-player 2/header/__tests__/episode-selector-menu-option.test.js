import React from 'react';
// import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import EpisodeSelectorMenuOption from '../episode-selector-menu-option';

describe('EpisodeSelectorMenuOption', () => {
  it('should render an episode', () => {
    const player = {};
    const episode = {
      id: 'f5af852c-1c3e-5591-9aa3-5beeb8958776',
      title: 'Deadwood',
      description: 'Jih iza buh bihewsec go ihaojo dimdu jaf wadu tap abmoado fajropab. Era zuzjahok tonegin idba lid jizmedtis cevi weraj wettuw op ban uhmowlis gavaeli ebe zoko epu. Vub ciuj tuhjem ma dup elwuefi saodil agumur kahpef fezvifkoj uburoruj toci ijoneza wuldafose. Niporna dop zuv rewbak ejifitem du owpeloz we rusam nabse purlol hehawruk adabaga ba.',
      duration: 350,
      seasonNumber: 1,
      tile: {
        image: 'http://tcnz.tmsimg.com/assets/p184931_ce_h9_aa.jpg',
      },
      rating: {
        id: '8ae7d2a2-24f6-5ba2-9551-29507ead9f4a',
        rating: 'R16',
      },
      videos: [
        {
          videoCloudReferenceId: '5419485997001',
          type: 'MOVIE',
          __typename: 'Video',
        },
        {
          videoCloudReferenceId: '5419486891001',
          type: 'PREVIEW',
          __typename: 'Video',
        },
      ],
      __typename: 'Episode',
    };

    const component = shallow(
      <EpisodeSelectorMenuOption
        option={episode}
        player={player}
      />);

    expect(component.node.props.className).toBe('episodeSelectorOptionDetail');
  });
});
