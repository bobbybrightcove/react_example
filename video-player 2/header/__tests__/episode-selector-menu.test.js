import React from 'react';
import renderer from 'react-test-renderer';
import EpisodeSelectorMenu from '../episode-selector-menu';
import contentItem from '../../__tests__/content-item.json';

describe('EpisodeSelectorMenu', () => {
  const player = {};
  const onSelectEpisodeSelectorOption = jest.fn();
  const setSeasonSelectorVisibility = jest.fn();
  const seasonNumber = 1;
  const episode = contentItem;

  const selected = {
    id: 'c4db2204-16f2-469f-8bc1-5c2244295930',
    title: 'Deep Water',
    description: 'Jih iza buh bihewsec go ihaojo dimdu jaf wadu tap abmoado fajropab. Era zuzjahok tonegin idba lid jizmedtis cevi weraj wettuw op ban uhmowlis gavaeli ebe zoko epu. Vub ciuj tuhjem ma dup elwuefi saodil agumur kahpef fezvifkoj uburoruj toci ijoneza wuldafose. Niporna dop zuv rewbak ejifitem du owpeloz we rusam nabse purlol hehawruk adabaga ba.',
  };

  it('should render with no selection', () => {
    const component = renderer.create(
      <EpisodeSelectorMenu
        options={episode.series.seasons[seasonNumber].episodes}
        player={player}
        selected={{}}
        onSelectEpisodeSelectorOption={onSelectEpisodeSelectorOption}
        setSeasonSelectorVisibility={setSeasonSelectorVisibility}
      />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render with episode selected', () => {
    const component = renderer.create(
      <EpisodeSelectorMenu
        options={episode.series.seasons[seasonNumber].episodes}
        player={player}
        selected={selected}
        onSelectEpisodeSelectorOption={onSelectEpisodeSelectorOption}
        setSeasonSelectorVisibility={setSeasonSelectorVisibility}
      />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
