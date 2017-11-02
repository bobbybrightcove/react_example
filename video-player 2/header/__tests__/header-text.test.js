import React from 'react';
import renderer from 'react-test-renderer';
import HeaderText from '../header-text';


describe('HeaderText', () => {
  it('renders according to valid snapshot', () => {
    const component = renderer.create(
      <HeaderText title="John Carter" />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
