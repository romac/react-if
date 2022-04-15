import { render, screen } from '@testing-library/react';
import React from 'react';
import { Unless } from '../src';

describe('<Unless /> component', () => {
  describe('Truthy cases', () => {
    test('GIVEN some children THEN does not render those', () => {
      render(
        <Unless condition={true}>
          <span data-testid="unlessChild">Unless</span>
        </Unless>
      );

      expect(screen.queryByTestId('unlessChild')).toBeNull();
    });

    test('GIVEN condition as function & children THEN does not render those', () => {
      render(
        <Unless condition={() => true}>
          <span data-testid="unlessChild">Unless</span>
        </Unless>
      );

      expect(screen.queryByTestId('unlessChild')).toBeNull();
    });
  });

  describe('Falsy cases', () => {
    test('GIVEN some children THEN renders those', () => {
      render(
        <Unless condition={false}>
          <span data-testid="unlessChild">Unless</span>
        </Unless>
      );

      expect(screen.queryByTestId('unlessChild')).toContainHTML('<span data-testid="unlessChild">Unless</span>');
    });

    test('GIVEN condition as function & some children THEN renders those', () => {
      render(
        <Unless condition={() => false}>
          <span data-testid="unlessChild">Unless</span>
        </Unless>
      );

      expect(screen.queryByTestId('unlessChild')).toContainHTML('<span data-testid="unlessChild">Unless</span>');
    });
  });
});
