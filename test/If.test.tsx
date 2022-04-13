import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Else, Fallback, If, Then } from '../src';
import type { ExtendablePromise } from '../src/types';

describe('<If /> component', () => {
  describe('Truthy cases', () => {
    describe('With NODE_ENV === test', () => {
      test('GIVEN <Then /> THEN renders children', () => {
        render(
          <If condition={true}>
            <Then>
              <span data-testid="thenChild">Then</span>
            </Then>
          </If>
        );

        expect(screen.queryByTestId('thenChild')).toContainHTML('<span data-testid="thenChild">Then</span>');
      });

      test('GIVEN <Then /> & <Else /> THEN renders children of <Then />', () => {
        render(
          <If condition={true}>
            <Then>
              <span data-testid="thenChild">Then</span>
            </Then>
            <Else>
              <span data-testid="elseChild">Else</span>
            </Else>
          </If>
        );

        expect(screen.queryByTestId('thenChild')).toContainHTML('<span data-testid="thenChild">Then</span>');
        expect(screen.queryByTestId('elseChild')).toBeNull();
      });

      test('GIVEN multiple <Then /> blocks THEN renders only first <Then /> block', () => {
        render(
          <If condition={true}>
            <Then>
              <span data-testid="thenChild1">Then1</span>
            </Then>
            <Then>
              <span data-testid="thenChild2">Then2</span>
            </Then>
          </If>
        );

        expect(screen.queryByTestId('thenChild1')).toContainHTML('<span data-testid="thenChild1">Then1</span>');
        expect(screen.queryByTestId('thenChild2')).toBeNull();
      });

      test('GIVEN <Else /> before <Then /> THEN renders <Then /> block', () => {
        render(
          <If condition={true}>
            <Else>
              <span data-testid="elseChild">Else</span>
            </Else>
            <Then>
              <span data-testid="thenChild">Then</span>
            </Then>
          </If>
        );

        expect(screen.queryByTestId('thenChild')).toContainHTML('<span data-testid="thenChild">Then</span>');
        expect(screen.queryByTestId('elseChild')).toBeNull();
      });
    });

    describe('With NODE_ENV === production', () => {
      beforeEach(() => {
        __DEV__ = false;
      });

      afterAll(() => {
        __DEV__ = true;
      });

      test('GIVEN content w/o <Then /> nor <Else /> THEN renders empty block in production', () => {
        render(
          <If condition={true}>
            <span data-testid="child">Not Then nor Else</span>
          </If>
        );

        expect(screen.queryByTestId('child')).toContainHTML('<span data-testid="child">Not Then nor Else</span>');
      });
    });

    describe('With condition as a function', () => {
      test('GIVEN <Then /> THEN renders children of <Then />', () => {
        render(
          <If condition={() => true}>
            <Then>
              <span data-testid="thenChild">Then</span>
            </Then>
          </If>
        );

        expect(screen.queryByTestId('thenChild')).toContainHTML('<span data-testid="thenChild">Then</span>');
      });

      test('GIVEN <Then /> & <Else /> THEN does not render children of <Else />', () => {
        render(
          <If condition={() => true}>
            <Then>
              <span data-testid="thenChild">Then</span>
            </Then>
            <Else>
              <span data-testid="elseChild">Else</span>
            </Else>
          </If>
        );

        expect(screen.queryByTestId('thenChild')).toContainHTML('<span data-testid="thenChild">Then</span>');
        expect(screen.queryByTestId('elseChild')).toBeNull();
      });

      test('GIVEN multiple <Then /> blocks THEN renders only first <Then /> block', () => {
        render(
          <If condition={() => true}>
            <Then>
              <span data-testid="thenChild">Then</span>
            </Then>
            <Then>
              <span data-testid="elseChild">Else</span>
            </Then>
          </If>
        );

        expect(screen.queryByTestId('thenChild')).toContainHTML('<span data-testid="thenChild">Then</span>');
        expect(screen.queryByTestId('elseChild')).toBeNull();
      });

      test('GIVEN <Else /> before <Then /> THEN renders <Then /> block', () => {
        render(
          <If condition={() => true}>
            <Else>
              <span data-testid="elseChild">Else</span>
            </Else>
            <Then>
              <span data-testid="thenChild">Then</span>
            </Then>
          </If>
        );

        expect(screen.queryByTestId('thenChild')).toContainHTML('<span data-testid="thenChild">Then</span>');
        expect(screen.queryByTestId('elseChild')).toBeNull();
      });
    });

    describe('With condition as a promise', () => {
      test('GIVEN pending promise THEN renders <Fallback /> block', () => {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        const pendingPromise = new Promise(() => {});

        render(
          <If condition={pendingPromise}>
            <Fallback>
              <span data-testid="fallbackChild">Fallback</span>
            </Fallback>
            <Then>
              <span data-testid="thenChild">Then</span>
            </Then>
            <Else>
              <span data-testid="elseChild">Else</span>
            </Else>
          </If>
        );

        expect(screen.queryByTestId('fallbackChild')).toContainHTML('<span data-testid="fallbackChild">Fallback</span>');
        expect(screen.queryByTestId('thenChild')).toBeNull();
        expect(screen.queryByTestId('elseChild')).toBeNull();
      });

      test('GIVEN resolved promise THEN renders <THEN /> block', async () => {
        render(
          <If condition={Promise.resolve()}>
            <Fallback>
              <span data-testid="fallbackChild">Fallback</span>
            </Fallback>
            <Then>
              <span data-testid="thenChild">Then</span>
            </Then>
            <Else>
              <span data-testid="elseChild">Else</span>
            </Else>
          </If>
        );

        await waitFor(() => screen.getByTestId('thenChild'));

        expect(screen.queryByTestId('fallbackChild')).toBeNull();
        expect(screen.queryByTestId('thenChild')).toContainHTML('<span data-testid="thenChild">Then</span>');
        expect(screen.queryByTestId('elseChild')).toBeNull();
      });

      test('GIVEN resolved promise THEN can retrieve return value inside THEN block', async () => {
        const returnValue = 'RETURN_VALUE';

        render(
          <If condition={Promise.resolve(returnValue)}>
            <Then>{(something: any) => <span data-testid="thenChild">{something}</span>}</Then>
          </If>
        );

        await waitFor(() => screen.getByTestId('thenChild'));

        expect(screen.queryByTestId('thenChild')).toContainHTML(`<span data-testid="thenChild">${returnValue}</span>`);
      });

      test('GIVEN promise with extra properties THEN should forward these properties to function param inside <Then />', async () => {
        const extendedPromise: ExtendablePromise<void> = Promise.resolve();
        extendedPromise.testValue = 1;

        render(
          <If condition={extendedPromise}>
            <Then>
              {(data: any, history: any, promise: any) => {
                data;
                history; // 'skip declared but value never read' error
                return <span data-testid="thenChild">{promise.testValue}</span>;
              }}
            </Then>
          </If>
        );

        await waitFor(() => screen.getByTestId('thenChild'));

        expect(screen.queryByTestId('thenChild')).toContainHTML(`<span data-testid="thenChild">${extendedPromise.testValue}</span>`);
      });
    });
  });

  describe('Falsy condition', () => {
    describe('With NODE_ENV === test', () => {
      test('GIVEN <Then /> THEN renders null', () => {
        render(
          <If condition={false}>
            <Then>
              <span data-testid="thenChild">Then</span>
            </Then>
          </If>
        );

        expect(screen.queryByTestId('thenChild')).toBeNull();
      });

      test('GIVEN <Then /> & <Else /> THEN renders children of <Else />', () => {
        render(
          <If condition={false}>
            <Then>
              <span data-testid="thenChild">Then</span>
            </Then>
            <Else>
              <span data-testid="elseChild">Else</span>
            </Else>
          </If>
        );

        expect(screen.queryByTestId('thenChild')).toBeNull();
        expect(screen.queryByTestId('elseChild')).toContainHTML('<span data-testid="elseChild">Else</span>');
      });

      test('GIVEN multiple <Else /> THEN renders only first <Else /> block', () => {
        render(
          <If condition={false}>
            <Else>
              <span data-testid="elseChild1">Else1</span>
            </Else>
            <Else>
              <span data-testid="elseChild2">Else2</span>
            </Else>
          </If>
        );

        expect(screen.queryByTestId('elseChild1')).toContainHTML('<span data-testid="elseChild1">Else1</span>');
        expect(screen.queryByTestId('elseChild2')).toBeNull();
      });

      test('GIVEN multiple <Else /> before <Then /> THEN renders <Else /> block', () => {
        render(
          <If condition={false}>
            <Else>
              <span data-testid="elseChild">Else</span>
            </Else>
            <Then>
              <span data-testid="thenChild">Then</span>
            </Then>
          </If>
        );

        expect(screen.queryByTestId('thenChild')).toBeNull();
        expect(screen.queryByTestId('elseChild')).toContainHTML('<span data-testid="elseChild">Else</span>');
      });
    });

    describe('With NODE_ENV === production', () => {
      beforeEach(() => {
        __DEV__ = false;
      });

      afterAll(() => {
        __DEV__ = true;
      });

      test('GIVEN content w/o <Then /> nor <Else /> THEN renders empty block in production', () => {
        render(
          <If condition={false}>
            <span data-testid="child">Not Then nor Else</span>
          </If>
        );

        expect(screen.queryByTestId('child')).toBeNull();
      });
    });

    describe('With child as function', () => {
      test('GIVEN <Else /> THEN renders children returned by function', () => {
        render(
          <If condition={false}>
            <Else>{() => <span data-testid="elseChild">Else</span>}</Else>
          </If>
        );

        expect(screen.queryByTestId('elseChild')).toContainHTML('<span data-testid="elseChild">Else</span>');
      });

      test('GIVEN body that should not evaluate THEN should not render', () => {
        // @ts-ignore Jest thinks the boolean is never read
        let called = false;

        const voidReturnCallback = (): void => {
          called = true;
          <div data-testid="thenChild">Then</div>;
        };

        render(
          <If condition={false}>
            <Then>
              <div data-testid="thenChild">Then</div>
            </Then>
            <Else>{voidReturnCallback() as any}</Else>
          </If>
        );

        expect(screen.queryByTestId('thenChild')).toBeNull();
        expect(screen.queryByTestId('elseChild')).toBeNull();
      });
    });

    describe('With condition as a promise', () => {
      test('GIVEN rejected promise THEN renders <ELSE /> block', async () => {
        render(
          // eslint-disable-next-line prefer-promise-reject-errors
          <If condition={Promise.reject()}>
            <Fallback>
              <span data-testid="fallbackChild">Fallback</span>
            </Fallback>
            <Then>
              <span data-testid="thenChild">Then</span>
            </Then>
            <Else>
              <span data-testid="elseChild">Else</span>
            </Else>
          </If>
        );

        await waitFor(() => screen.getByTestId('elseChild'));

        expect(screen.queryByTestId('fallbackChild')).toBeNull();
        expect(screen.queryByTestId('thenChild')).toBeNull();
        expect(screen.queryByTestId('elseChild')).toContainHTML('<span data-testid="elseChild">Else</span>');
      });

      test('GIVEN rejected promise THEN can retrieve error inside ELSE block', async () => {
        const caughtError = 'CAUGHT_ERROR';

        render(
          <If condition={Promise.reject(caughtError)}>
            <Else>{(something: any) => <span data-testid="elseChild">{something}</span>}</Else>
          </If>
        );

        await waitFor(() => screen.getByTestId('elseChild'));

        expect(screen.queryByTestId('fallbackChild')).toBeNull();
        expect(screen.queryByTestId('thenChild')).toBeNull();
        expect(screen.queryByTestId('elseChild')).toContainHTML(`<span data-testid="elseChild">${caughtError}</span>`);
      });

      test('GIVEN promise with extra properties THEN should forward these properties to function param inside <Else />', async () => {
        // eslint-disable-next-line prefer-promise-reject-errors
        const extendedPromise: ExtendablePromise<void> = Promise.reject();
        extendedPromise.testValue = 'TEST_VALUE';

        render(
          <If condition={extendedPromise}>
            <Else>
              {(data: any, history: any, promise: any) => {
                data;
                history; // 'skip declared but value never read' error
                return <span data-testid="elseChild">{promise.testValue}</span>;
              }}
            </Else>
          </If>
        );

        await waitFor(() => screen.getByTestId('elseChild'));

        expect(screen.queryByTestId('fallbackChild')).toBeNull();
        expect(screen.queryByTestId('thenChild')).toBeNull();
        expect(screen.queryByTestId('elseChild')).toContainHTML(`<span data-testid="elseChild">${extendedPromise.testValue}</span>`);
      });
    });
  });
});
