import { shallow } from 'enzyme';
import React from 'react';
import { Unless } from '../src';

describe('<Unless /> component', () => {
  describe('Truthy cases', () => {
    test('GIVEN some children THEN does not render those', () => {
      const wrapped = shallow(
        <Unless condition={true}>
          <span>Unless</span>
        </Unless>
      );

      expect(wrapped).toMatchSnapshot();
      expect(wrapped.containsMatchingElement(<span>Unless</span>)).toBe(false);
      expect(wrapped.html()).toBeNull();
    });

    test('GIVEN no children THEN renders null', () => {
      const wrapped = shallow(<Unless condition={true}></Unless>);

      expect(wrapped).toMatchSnapshot();
      expect(wrapped.html()).toBeNull();
    });

    test('GIVEN condition as function & children THEN does not render those', () => {
      const wrapped = shallow(
        <Unless condition={() => true}>
          <span>Unless</span>
        </Unless>
      );

      expect(wrapped).toMatchSnapshot();
      expect(wrapped.containsMatchingElement(<span>Unless</span>)).toBe(false);
      expect(wrapped.html()).toBeNull();
    });
  });

  describe('Falsy cases', () => {
    test('GIVEN some children THEN renders those', () => {
      const wrapped = shallow(
        <Unless condition={false}>
          <span>Unless</span>
        </Unless>
      );

      expect(wrapped).toMatchSnapshot();
      expect(wrapped.containsMatchingElement(<span>Unless</span>)).toBe(true);
    });

    test('GIVEN condition as function & some children THEN renders those', () => {
      const wrapped = shallow(
        <Unless condition={() => false}>
          <span>Unless</span>
        </Unless>
      );

      expect(wrapped).toMatchSnapshot();
      expect(wrapped.containsMatchingElement(<span>Unless</span>)).toBe(true);
    });
  });
});
