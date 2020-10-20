import { shallow } from 'enzyme';
import React from 'react';
import { When } from '../src';

describe('<When /> component', () => {
  describe('Truthy cases', () => {
    test('GIVEN some children THEN renders those', () => {
      const wrapped = shallow(
        <When condition={true}>
          <span>When</span>
        </When>
      );

      expect(wrapped).toMatchSnapshot();
      expect(wrapped.containsMatchingElement(<span>When</span>)).toBe(true);
    });

    test('GIVEN no children THEN renders null', () => {
      const wrapped = shallow(<When condition={true}></When>);

      expect(wrapped).toMatchSnapshot();
      expect(wrapped.html()).toBeNull();
    });

    test('GIVEN condition as function & children THEN renders those', () => {
      const wrapped = shallow(
        <When condition={() => true}>
          <span>When</span>
        </When>
      );

      expect(wrapped).toMatchSnapshot();
      expect(wrapped.containsMatchingElement(<span>When</span>)).toBe(true);
    });
  });

  describe('Falsy cases', () => {
    test('GIVEN some children THEN does not render those', () => {
      const wrapped = shallow(
        <When condition={false}>
          <span>When</span>
        </When>
      );

      expect(wrapped).toMatchSnapshot();
      expect(wrapped.containsMatchingElement(<span>When</span>)).toBe(false);
      expect(wrapped.html()).toBeNull();
    });

    test('GIVEN condition as function & some children THEN does not render those', () => {
      const wrapped = shallow(
        <When condition={() => false}>
          <span>When</span>
        </When>
      );

      expect(wrapped).toMatchSnapshot();
      expect(wrapped.containsMatchingElement(<span>When</span>)).toBe(false);
      expect(wrapped.html()).toBeNull();
    });
  });
});
