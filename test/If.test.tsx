import { mount, shallow } from 'enzyme';
import React from 'react';
import { Else, If, Then } from '../src';

describe('Truthy cases', () => {
  describe('With NODE_ENV === test', () => {
    test('GIVEN <Then /> THEN renders children', () => {
      const wrapped = shallow(
        <If condition={true}>
          <Then>
            <span>Then</span>
          </Then>
        </If>
      );

      expect(wrapped).toMatchSnapshot();
      expect(wrapped.containsMatchingElement(<span>Then</span>)).toBe(true);
    });

    test('GIVEN <Then /> & <Else /> THEN renders children of <Then />', () => {
      const wrapped = shallow(
        <If condition={true}>
          <Then>
            <span>Then</span>
          </Then>
          <Else>
            <span>Else</span>
          </Else>
        </If>
      );

      expect(wrapped).toMatchSnapshot();
      expect(wrapped.containsMatchingElement(<span>Then</span>)).toBe(true);
      expect(wrapped.containsMatchingElement(<span>Else</span>)).toBe(false);
    });

    test('GIVEN multiple <Then /> blocks THEN renders only first <Then /> block', () => {
      const wrapped = shallow(
        <If condition={true}>
          <Then>
            <span>Then1</span>
          </Then>
          <Then>
            <span>Then2</span>
          </Then>
        </If>
      );

      expect(wrapped).toMatchSnapshot();
      expect(wrapped.containsMatchingElement(<span>Then1</span>)).toBe(true);
      expect(wrapped.containsMatchingElement(<span>Then2</span>)).toBe(false);
    });

    test('GIVEN <Else /> before <Then /> THEN renders <Then /> block', () => {
      const wrapped = shallow(
        <If condition={true}>
          <Else>
            <span>Else</span>
          </Else>
          <Then>
            <span>Then</span>
          </Then>
        </If>
      );

      expect(wrapped).toMatchSnapshot();
      expect(wrapped.containsMatchingElement(<span>Then</span>)).toBe(true);
      expect(wrapped.containsMatchingElement(<span>Else</span>)).toBe(false);
    });

    test('GIVEN content w/o <Then /> nor <Else /> THEN errors in test & development', () => {
      expect(() =>
        shallow(
          <If condition={true}>
            <span>Not Then nor Else</span>
          </If>
        )
      ).toThrowError('The <If> component should contain <Then /> and <Else /> components as its children');
    });

    test('GIVEN w/o children THEN renders null', () => {
      const wrapped = shallow(<If condition={true} />);

      expect(wrapped).toMatchSnapshot();
      expect(wrapped.html()).toBeNull();
    });
  });

  describe('With NODE_ENV === production', () => {
    beforeEach(() => {
      // @ts-expect-error __DEV__ is exposed by Jest
      global.__DEV__ = false;
    });

    afterAll(() => {
      // @ts-expect-error __DEV__ is exposed by Jest
      global.__DEV__ = true;
    });

    test('GIVEN content w/o <Then /> nor <Else /> THEN renders empty block in production', () => {
      const wrapped = shallow(
        <If condition={true}>
          <span>Not Then nor Else</span>
        </If>
      );

      expect(wrapped).toMatchSnapshot();
      expect(wrapped.containsMatchingElement(<span>Not Then nor Else</span>)).toBe(true);
    });
  });

  describe('With condition as a function', () => {
    test('GIVEN <Then /> THEN renders children of <Then />', () => {
      const wrapped = shallow(
        <If condition={() => true}>
          <Then>
            <span>Then</span>
          </Then>
        </If>
      );

      expect(wrapped).toMatchSnapshot();
      expect(wrapped.containsMatchingElement(<span>Then</span>)).toBe(true);
    });

    test('GIVEN <Then /> & <Else /> THEN does not render children of <Else />', () => {
      const wrapped = shallow(
        <If condition={() => true}>
          <Then>
            <span>Then</span>
          </Then>
          <Else>
            <span>Else</span>
          </Else>
        </If>
      );

      expect(wrapped).toMatchSnapshot();
      expect(wrapped.containsMatchingElement(<span>Then</span>)).toBe(true);
      expect(wrapped.containsMatchingElement(<span>Else</span>)).toBe(false);
    });

    test('GIVEN multiple <Then /> blocks THEN renders only first <Then /> block', () => {
      const wrapped = shallow(
        <If condition={() => true}>
          <Then>
            <span>Then1</span>
          </Then>
          <Then>
            <span>Then2</span>
          </Then>
        </If>
      );

      expect(wrapped).toMatchSnapshot();
      expect(wrapped.containsMatchingElement(<span>Then1</span>)).toBe(true);
      expect(wrapped.containsMatchingElement(<span>Then2</span>)).toBe(false);
    });

    test('GIVEN <Else /> before <Then /> THEN renders <Then /> block', () => {
      const wrapped = shallow(
        <If condition={() => true}>
          <Else>
            <span>Else</span>
          </Else>
          <Then>
            <span>Then</span>
          </Then>
        </If>
      );

      expect(wrapped).toMatchSnapshot();
      expect(wrapped.containsMatchingElement(<span>Then</span>)).toBe(true);
      expect(wrapped.containsMatchingElement(<span>Else</span>)).toBe(false);
    });
  });
});

describe('Falsy condition', () => {
  describe('With NODE_ENV === test', () => {
    test('GIVEN <Then /> THEN renders null', () => {
      const wrapped = shallow(
        <If condition={false}>
          <Then>
            <span>Then</span>
          </Then>
        </If>
      );

      expect(wrapped).toMatchSnapshot();
      expect(wrapped.containsMatchingElement(<span>Then</span>)).toBe(false);
      expect(wrapped.html()).toBe('');
    });

    test('GIVEN <Then /> & <Else /> THEN renders children of <Else />', () => {
      const wrapped = shallow(
        <If condition={false}>
          <Then>
            <span>Then</span>
          </Then>
          <Else>
            <span>Else</span>
          </Else>
        </If>
      );

      expect(wrapped).toMatchSnapshot();
      expect(wrapped.containsMatchingElement(<span>Then</span>)).toBe(false);
      expect(wrapped.containsMatchingElement(<span>Else</span>)).toBe(true);
    });

    test('GIVEN multiple <Else /> THEN renders only first <Else /> block', () => {
      const wrapped = shallow(
        <If condition={false}>
          <Else>
            <span>Else1</span>
          </Else>
          <Else>
            <span>Else2</span>
          </Else>
        </If>
      );

      expect(wrapped).toMatchSnapshot();
      expect(wrapped.containsMatchingElement(<span>Else1</span>)).toBe(true);
      expect(wrapped.containsMatchingElement(<span>Else2</span>)).toBe(false);
    });

    test('GIVEN multiple <Else /> before <Then /> THEN renders <Else /> block', () => {
      const wrapped = shallow(
        <If condition={false}>
          <Else>
            <span>Else</span>
          </Else>
          <Then>
            <span>Then</span>
          </Then>
        </If>
      );

      expect(wrapped).toMatchSnapshot();
      expect(wrapped.containsMatchingElement(<span>Else</span>)).toBe(true);
      expect(wrapped.containsMatchingElement(<span>Then</span>)).toBe(false);
    });
    test('GIVEN w/o <Then /> nor <Else /> THEN throws error', () => {
      expect(() =>
        shallow(
          <If condition={false}>
            <span>Content</span>
          </If>
        )
      ).toThrowError('The <If> component should contain <Then /> and <Else /> components as its children');
    });

    test('GIVEN w/o children THEN renders null', () => {
      const wrapped = shallow(<If condition={false} />);

      expect(wrapped).toMatchSnapshot();
      expect(wrapped.html()).toBeNull();
    });
  });

  describe('With NODE_ENV === production', () => {
    beforeEach(() => {
      // @ts-expect-error __DEV__ is exposed by Jest
      global.__DEV__ = false;
    });

    afterAll(() => {
      // @ts-expect-error __DEV__ is exposed by Jest
      global.__DEV__ = true;
    });

    test('GIVEN content w/o <Then /> nor <Else /> THEN renders empty block in production', () => {
      const wrapped = shallow(
        <If condition={false}>
          <span>Not Then nor Else</span>
        </If>
      );

      expect(wrapped).toMatchSnapshot();
      expect(wrapped.containsMatchingElement(<span>Not Then nor Else</span>)).toBe(false);
    });
  });

  describe('With child as function', () => {
    test('GIVEN <Else /> THEN renders children returned by function', () => {
      const wrapped = mount(
        <If condition={false}>
          <Else>{() => <span>Else</span>}</Else>
        </If>
      );

      expect(wrapped).toMatchSnapshot();
      expect(wrapped.containsMatchingElement(<span>Else</span>)).toBe(true);
    });

    test('GIVEN <Else /> THEN renders children returned by function', () => {
      const wrapped = mount(
        <If condition={() => false}>
          <Else>{() => <span>Else</span>}</Else>
        </If>
      );

      expect(wrapped).toMatchSnapshot();
      expect(wrapped.containsMatchingElement(<span>Else</span>)).toBe(true);
    });

    test('GIVEN body that should not evaluate THEN should not render', () => {
      // @ts-expect-error called should just be declared
      let called = false;

      const wrapped = mount(
        <If condition={false}>
          <Then>
            {() => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              called = true;
              <div>Bad</div>;
            }}
          </Then>
          <Else>
            <div>Ok</div>
          </Else>
        </If>
      );

      expect(wrapped).toMatchSnapshot();
      expect(wrapped.containsMatchingElement(<div>Ok</div>)).toBe(true);
      expect(wrapped.containsMatchingElement(<div>Bad</div>)).toBe(false);
    });

    test('GIVEN body that should not evaluate THEN should not render', () => {
      // @ts-expect-error called should just be declared
      let called = false;

      const wrapped = mount(
        <If condition={() => false}>
          <Then>
            {() => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              called = true;
              <div>Bad</div>;
            }}
          </Then>
          <Else>
            <div>Ok</div>
          </Else>
        </If>
      );

      expect(wrapped).toMatchSnapshot();
      expect(wrapped.containsMatchingElement(<div>Ok</div>)).toBe(true);
      expect(wrapped.containsMatchingElement(<div>Bad</div>)).toBe(false);
    });
  });
});
