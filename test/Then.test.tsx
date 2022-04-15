import { render, screen } from '@testing-library/react';
import React from 'react';
import { Then } from '../src';

describe('<Then /> component', () => {
  test('GIVEN children THEN directly renders children', () => {
    render(
      <Then>
        <span data-testid="thenChild">Then</span>
      </Then>
    );

    expect(screen.getByTestId('thenChild')).toContainHTML('<span data-testid="thenChild">Then</span>');
  });
});
