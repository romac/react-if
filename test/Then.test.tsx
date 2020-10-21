import { shallow } from 'enzyme';
import React from 'react';
import { Then } from '../src';

describe('<Then /> component', () => {
  test('GIVEN children THEN directly renders children', () => {
    const wrapped = shallow(
      <Then>
        <span>Then</span>
      </Then>
    );

    expect(wrapped).toMatchSnapshot();
    expect(wrapped.containsMatchingElement(<span>Then</span>)).toBe(true);
  });

  test('GIVEN no children THEN renders null', () => {
    const wrapped = shallow(<Then />);

    expect(wrapped).toMatchSnapshot();
    expect(wrapped.html()).toBe('');
  });
});
