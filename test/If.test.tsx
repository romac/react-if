import { shallow } from 'enzyme';
import React from 'react';
import { Else, If, Then } from '../src';

describe('If component - with NODE_ENV === test', () => {
  test('GIVEN If w/ <Then /> & truthy condition THEN renders children', () => {
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

  test('GIVEN If w/ <Then /> & <Else /> & truthy condition THEN renders children of <Then />', () => {
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

  test('GIVEN If w/ <Then /> & <Else /> & falsy condition THEN renders children of <Else />', () => {
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

  test('GIVEN If w/ multiple <Then /> blocks THEN renders only first <Then /> block', () => {
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

  test('GIVEN If w/ <Else /> before <Then /> THEN renders <Then /> block', () => {
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

describe('If Component - with NODE_ENV === production', () => {
  const PRE_TEST_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...PRE_TEST_ENV };
    process.env.NODE_ENV = 'production';
  });

  afterAll(() => {
    process.env = PRE_TEST_ENV;
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
