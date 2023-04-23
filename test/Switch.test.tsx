import { render, screen } from '@testing-library/react';
import React, { type ReactNode } from 'react';
import { Case, Default, Switch } from '../src';

describe('<Switch /> component', () => {
  describe('Renders children <Case />', () => {
    test('GIVEN multiple cases w/ truthy condition THEN renders children of first <Case />', () => {
      render(
        <Switch>
          <Case condition={true}>
            <span data-testid="case1">Case1</span>
          </Case>
          <Case condition={true}>
            <span data-testid="case2">Case2</span>
          </Case>
        </Switch>
      );

      expect(screen.queryByTestId('case1')).toContainHTML('<span data-testid="case1">Case1</span>');
      expect(screen.queryByTestId('case2')).toBeNull();
    });

    test('GIVEN multiple cases w/ falsy condition then truthy condition THEN renders children of second <Case />', () => {
      render(
        <Switch>
          <Case condition={false}>
            <span data-testid="case1">Case1</span>
          </Case>
          <Case condition={true}>
            <span data-testid="case2">Case2</span>
          </Case>
        </Switch>
      );

      expect(screen.queryByTestId('case1')).toBeNull();
      expect(screen.queryByTestId('case2')).toContainHTML('<span data-testid="case2">Case2</span>');
    });

    test('GIVEN multiple cases w/ falsy condition then function as truthy condition THEN renders children of second <Case />', () => {
      render(
        <Switch>
          <Case condition={false}>
            <span data-testid="case=1">Case1</span>
          </Case>
          <Case condition={() => true}>
            <span data-testid="case2">Case2</span>
          </Case>
        </Switch>
      );

      expect(screen.queryByTestId('case1')).toBeNull();
      expect(screen.queryByTestId('case2')).toContainHTML('<span data-testid="case2">Case2</span>');
    });

    test('GIVEN condition as function THEN resolves for first <Case />', () => {
      render(
        <Switch>
          <Case condition={() => true}>
            <span data-testid="case1">Case1</span>
          </Case>
          <Case condition={() => false}>
            <span data-testid="case2">Case2</span>
          </Case>
          <Case condition={() => true}>
            <span data-testid="case3">Case3</span>
          </Case>
        </Switch>
      );

      expect(screen.queryByTestId('case1')).toContainHTML('<span data-testid="case1">Case1</span>');
      expect(screen.queryByTestId('case2')).toBeNull();
      expect(screen.queryByTestId('case-3')).toBeNull();
    });

    test('GIVEN child as function THEN resolves for first <Case />', () => {
      render(
        <Switch>
          <Case condition={() => true}>{() => <span data-testid="case1">Case1</span>}</Case>
          <Case condition={() => false}>
            <span data-testid="case2">Case2</span>
          </Case>
          <Case condition={() => true}>
            <span data-testid="case3">Case3</span>
          </Case>
        </Switch>
      );

      expect(screen.queryByTestId('case1')).toContainHTML('<span data-testid="case1">Case1</span>');
      expect(screen.queryByTestId('case2')).toBeNull();
      expect(screen.queryByTestId('case-3')).toBeNull();
    });
  });

  describe('Renders the child element of <Default />', () => {
    test('GIVEN simple <Default /> THEN renders children of <Default />', () => {
      render(
        <Switch>
          <Default>
            <span data-testid="default">Default</span>
          </Default>
        </Switch>
      );

      expect(screen.queryByTestId('default')).toContainHTML('<span data-testid="default">Default</span>');
    });

    test('GIVEN falsy <Case /> and <Default /> THEN renders children of <Default />', () => {
      render(
        <Switch>
          <Case condition={false}>
            <span data-testid="case1">Case</span>
          </Case>
          <Default>
            <span data-testid="default">Default</span>
          </Default>
        </Switch>
      );

      expect(screen.queryByTestId('case1')).toBeNull();
      expect(screen.queryByTestId('default')).toContainHTML('<span data-testid="default">Default</span>');
    });

    test('GIVEN truthy <Case /> and <Default /> THEN renders children of <Case />', () => {
      render(
        <Switch>
          <Case condition={true}>
            <span data-testid="case1">Case</span>
          </Case>
          <Default>
            <span data-testid="default">Default</span>
          </Default>
        </Switch>
      );

      expect(screen.queryByTestId('case1')).toContainHTML('<span data-testid="case1">Case</span>');
      expect(screen.queryByTestId('default')).toBeNull();
    });

    test('GIVEN children as function THEN renders children of <Default />', () => {
      render(
        <Switch>
          <Case condition={false}>{() => <span data-testid="case1">Case</span>}</Case>
          <Default>{() => <span data-testid="default">Default</span>}</Default>
        </Switch>
      );

      expect(screen.queryByTestId('case1')).toBeNull();
      expect(screen.queryByTestId('default')).toContainHTML('<span data-testid="default">Default</span>');
    });
  });

  describe('Renders nothing in some cases', () => {
    test('GIVEN multiple cases w/ all falsy condition THEN renders nothing', () => {
      render(
        <Switch>
          <Case condition={false}>
            <span data-testid="case1">Case1</span>
          </Case>
          <Case condition={false}>
            <span data-testid="case2">Case2</span>
          </Case>
        </Switch>
      );

      expect(screen.queryByTestId('case1')).toBeNull();
      expect(screen.queryByTestId('case2')).toBeNull();
    });

    test('GIVEN invalid React children THEN does not render those', () => {
      render(
        <Switch>
          {(() => [{ key: 'one', prop: 'two' }]) as unknown as ReactNode}
          <Case condition={true}>
            <span data-testid="case2">Case2</span>
          </Case>
        </Switch>
      );

      expect(screen.queryByTestId('case2')).toContainHTML('<span data-testid="case2">Case2</span>');
    });
  });
});
