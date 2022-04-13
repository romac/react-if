import { mount, shallow } from 'enzyme';
import React from 'react';
import { Case, Default, Switch } from '../src';

describe('<Switch /> component', () => {
  describe('Renders children <Case />', () => {
    test('GIVEN multiple cases w/ truthy condition THEN renders children of first <Case />', () => {
      const wrapped = shallow(
        <Switch>
          <Case condition={true}>
            <span>Case1</span>
          </Case>
          <Case condition={true}>
            <span>Case2</span>
          </Case>
        </Switch>
      );

      expect(wrapped).toMatchSnapshot();
      expect(wrapped.containsMatchingElement(<span>Case1</span>)).toBe(true);
      expect(wrapped.containsMatchingElement(<span>Case2</span>)).toBe(false);
    });

    test('GIVEN multiple cases w/ falsy condition then truthy condition THEN renders children of second <Case />', () => {
      const wrapped = shallow(
        <Switch>
          <Case condition={false}>
            <span>Case1</span>
          </Case>
          <Case condition={true}>
            <span>Case2</span>
          </Case>
        </Switch>
      );

      expect(wrapped).toMatchSnapshot();
      expect(wrapped.containsMatchingElement(<span>Case1</span>)).toBe(false);
      expect(wrapped.containsMatchingElement(<span>Case2</span>)).toBe(true);
    });

    test('GIVEN multiple cases w/ falsy condition then function as truthy condition THEN renders children of second <Case />', () => {
      const wrapped = shallow(
        <Switch>
          <Case condition={false}>
            <span>Case1</span>
          </Case>
          <Case condition={() => true}>
            <span>Case2</span>
          </Case>
        </Switch>
      );

      expect(wrapped).toMatchSnapshot();
      expect(wrapped.containsMatchingElement(<span>Case1</span>)).toBe(false);
      expect(wrapped.containsMatchingElement(<span>Case2</span>)).toBe(true);
    });

    test('GIVEN condition as function THEN resolves for first <Case />', () => {
      const wrapped = shallow(
        <Switch>
          <Case condition={() => true}>
            <span>Case1</span>
          </Case>
          <Case condition={() => false}>
            <span>Case2</span>
          </Case>
          <Case condition={() => true}>
            <span>Case3</span>
          </Case>
        </Switch>
      );

      expect(wrapped).toMatchSnapshot();
      expect(wrapped.containsMatchingElement(<span>Case1</span>)).toBe(true);
      expect(wrapped.containsMatchingElement(<span>Case2</span>)).toBe(false);
      expect(wrapped.containsMatchingElement(<span>Case3</span>)).toBe(false);
    });

    test('GIVEN child as function THEN resolves for first <Case />', () => {
      const wrapped = mount(
        <Switch>
          <Case condition={() => true}>{() => <span>Case1</span>}</Case>
          <Case condition={() => false}>
            <span>Case2</span>
          </Case>
          <Case condition={() => true}>
            <span>Case3</span>
          </Case>
        </Switch>
      );

      expect(wrapped).toMatchSnapshot();
      expect(wrapped.containsMatchingElement(<span>Case1</span>)).toBe(true);
      expect(wrapped.containsMatchingElement(<span>Case2</span>)).toBe(false);
      expect(wrapped.containsMatchingElement(<span>Case3</span>)).toBe(false);
    });
  });

  describe('Renders the child element of <Default />', () => {
    test('GIVEN simple <Default /> THEN renders children of <Default />', () => {
      const wrapped = shallow(
        <Switch>
          <Default>
            <span>Default</span>
          </Default>
        </Switch>
      );

      expect(wrapped).toMatchSnapshot();
      expect(wrapped.containsMatchingElement(<span>Default</span>)).toBe(true);
    });

    test('GIVEN falsy <Case /> and <Default /> THEN renders children of <Default />', () => {
      const wrapped = shallow(
        <Switch>
          <Case condition={false}>
            <span>Case</span>
          </Case>
          <Default>
            <span>Default</span>
          </Default>
        </Switch>
      );

      expect(wrapped).toMatchSnapshot();
      expect(wrapped.containsMatchingElement(<span>Default</span>)).toBe(true);
      expect(wrapped.containsMatchingElement(<span>Case</span>)).toBe(false);
    });

    test('GIVEN truthy <Case /> and <Default /> THEN renders children of <Case />', () => {
      const wrapped = shallow(
        <Switch>
          <Case condition={true}>
            <span>Case</span>
          </Case>
          <Default>
            <span>Default</span>
          </Default>
        </Switch>
      );

      expect(wrapped).toMatchSnapshot();
      expect(wrapped.containsMatchingElement(<span>Case</span>)).toBe(true);
      expect(wrapped.containsMatchingElement(<span>Default</span>)).toBe(false);
    });

    test('GIVEN children as function THEN renders children of <Default />', () => {
      const wrapped = mount(
        <Switch>
          <Case condition={false}>{() => <span>Case</span>}</Case>
          <Default>{() => <span>Default</span>}</Default>
        </Switch>
      );

      expect(wrapped).toMatchSnapshot();
      expect(wrapped.containsMatchingElement(<span>Default</span>)).toBe(true);
      expect(wrapped.containsMatchingElement(<span>Case</span>)).toBe(false);
    });
  });

  describe('Renders nothing in some cases', () => {
    test('GIVEN no children THEN renders nothing', () => {
      const wrapped = shallow(<Switch></Switch>);

      expect(wrapped).toMatchSnapshot();
      expect(wrapped.html()).toBeNull();
    });

    test('GIVEN multiple cases w/ all falsy condition THEN renders nothing', () => {
      const wrapped = shallow(
        <Switch>
          <Case condition={false}>
            <span>Case1</span>
          </Case>
          <Case condition={false}>
            <span>Case2</span>
          </Case>
        </Switch>
      );

      expect(wrapped).toMatchSnapshot();
      expect(wrapped.containsMatchingElement(<span>Case1</span>)).toBe(false);
      expect(wrapped.containsMatchingElement(<span>Case2</span>)).toBe(false);
      expect(wrapped.html()).toBeNull();
    });

    test('GIVEN invalid React children THEN does not render those', () => {
      const wrapped = shallow(
        <Switch>
          {() => [{ key: 'one', prop: 'two' }]}
          <Case condition={true}>
            <span>Case2</span>
          </Case>
        </Switch>
      );

      expect(wrapped).toMatchSnapshot();
      expect(wrapped.containsMatchingElement(<span>Case1</span>)).toBe(false);
      expect(wrapped.containsMatchingElement(<span>Case2</span>)).toBe(true);
    });
  });
});
