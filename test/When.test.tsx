import React from 'react';
import { render, screen } from '@testing-library/react';
import { When } from '../src';

describe('<When /> component', () => {
  describe('Truthy cases', () => {
    test('GIVEN some children THEN renders those', () => {
      render(
        <When condition={true}>
          <span data-testid="whenChild">When</span>
        </When>
      );

      expect(screen.getByTestId('whenChild')).toContainHTML('<span data-testid="whenChild">When</span>');
    });

    test('GIVEN condition as function & children THEN renders those', () => {
      render(
        <When condition={() => true}>
          <span data-testid="whenChild">When</span>
        </When>
      );

      expect(screen.getByTestId('whenChild')).toContainHTML('<span data-testid="whenChild">When</span>');
    });
  });

  describe('Falsy cases', () => {
    test('GIVEN some children THEN does not render those', () => {
      render(
        <When condition={false}>
          <span data-testid="whenChild">When</span>
        </When>
      );

      expect(screen.queryByTestId('whenChild')).toBeNull();
    });

    test('GIVEN condition as function & some children THEN does not render those', () => {
      render(
        <When condition={() => false}>
          <span data-testid="whenChild">When</span>
        </When>
      );

      expect(screen.queryByTestId('whenChild')).toBeNull();
    });
  });
});
