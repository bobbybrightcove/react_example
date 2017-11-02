import React from 'react';
import renderer from 'react-test-renderer';
import BackIcon from '../back';

describe('BackIcon', () => {
  it('renders according to valid snapshot', () => {
    const component = renderer.create(
      <BackIcon screenId="better-call-saul" />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should change icon on mouse enter/leave', () => {
    const component = renderer.create(
      <BackIcon screenId="better-call-saul" />
    );

    // onMouseEnter
    component.toJSON().props.onMouseEnter();

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // onMouseLeave
    tree.props.onMouseLeave();

    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
