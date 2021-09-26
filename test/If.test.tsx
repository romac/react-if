import { mount, ReactWrapper, shallow } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { Else, Fallback, If, Then } from '../src';
import type { ExtendablePromise } from '../src/types';

const waitForComponentToPaint = async (wrapped: ReactWrapper) => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    wrapped.update();
  });
};

describe('<If /> component', () => {
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

    describe('With condition as a promise', () => {
      test('GIVEN pending promise THEN renders <Fallback /> block', () => {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        const pendingPromise = new Promise(() => {});
        const wrapped: ReactWrapper = mount(
          <If condition={pendingPromise}>
            <Fallback>
              <span>Fallback</span>
            </Fallback>
            <Then>
              <span>Then</span>
            </Then>
            <Else>
              <span>Else</span>
            </Else>
          </If>
        );

        expect(wrapped).toMatchSnapshot();
        expect(wrapped.containsMatchingElement(<span>Fallback</span>)).toBe(true);
        expect(wrapped.containsMatchingElement(<span>Then</span>)).toBe(false);
        expect(wrapped.containsMatchingElement(<span>Else</span>)).toBe(false);
      });

      test('GIVEN resolved promise THEN renders <THEN /> block', async () => {
        const wrapped: ReactWrapper = mount(
          <If condition={Promise.resolve()}>
            <Fallback>
              <span>Fallback</span>
            </Fallback>
            <Then>
              <span>Then</span>
            </Then>
            <Else>
              <span>Else</span>
            </Else>
          </If>
        );
        await waitForComponentToPaint(wrapped);

        expect(wrapped).toMatchSnapshot();
        expect(wrapped.containsMatchingElement(<span>Fallback</span>)).toBe(false);
        expect(wrapped.containsMatchingElement(<span>Then</span>)).toBe(true);
        expect(wrapped.containsMatchingElement(<span>Else</span>)).toBe(false);
      });

      test('GIVEN resolved promise THEN can retrieve return value inside THEN block', async () => {
        const returnValue = 'RETURN_VALUE';
        const wrapped: ReactWrapper = mount(
          <If condition={Promise.resolve(returnValue)}>
            <Then>{(something: any) => <span>{something}</span>}</Then>
          </If>
        );
        await waitForComponentToPaint(wrapped);

        expect(wrapped.containsMatchingElement(<span>{returnValue}</span>)).toBe(true);
      });

      test('GIVEN promise with extra properties THEN should forward these properties to function param inside <Then />', async () => {
        const extendedPromise: ExtendablePromise<void> = Promise.resolve();
        extendedPromise.testValue = 1;
        const wrapped: ReactWrapper = mount(
          <If condition={extendedPromise}>
            <Then>
              {(data: any, history: any, promise: any) => {
                data;
                history; // 'skip declared but value never read' error
                return <span>{promise.testValue}</span>;
              }}
            </Then>
          </If>
        );
        await waitForComponentToPaint(wrapped);
        expect(wrapped.containsMatchingElement(<span>{extendedPromise.testValue}</span>));
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

    describe('With condition as a promise', () => {
      test('GIVEN rejected promise THEN renders <ELSE /> block', async () => {
        const wrapped: ReactWrapper = mount(
          // eslint-disable-next-line prefer-promise-reject-errors
          <If condition={Promise.reject()}>
            <Fallback>
              <span>Fallback</span>
            </Fallback>
            <Then>
              <span>Then</span>
            </Then>
            <Else>
              <span>Else</span>
            </Else>
          </If>
        );

        expect(wrapped.containsMatchingElement(<span>Fallback</span>)).toBe(true);
        expect(wrapped.containsMatchingElement(<span>Then</span>)).toBe(false);
        expect(wrapped.containsMatchingElement(<span>Else</span>)).toBe(false);

        await waitForComponentToPaint(wrapped);

        expect(wrapped).toMatchSnapshot();
        expect(wrapped.containsMatchingElement(<span>Fallback</span>)).toBe(false);
        expect(wrapped.containsMatchingElement(<span>Then</span>)).toBe(false);
        expect(wrapped.containsMatchingElement(<span>Else</span>)).toBe(true);
      });

      test('GIVEN rejected promise THEN can retrieve error inside ELSE block', async () => {
        const caughtError = 'CAUGHT_ERROR';
        const wrapped: ReactWrapper = mount(
          <If condition={Promise.reject(caughtError)}>
            <Else>{(something: any) => <span>{something}</span>}</Else>
          </If>
        );
        await waitForComponentToPaint(wrapped);
        expect(wrapped.containsMatchingElement(<span>{caughtError}</span>)).toBe(true);
      });

      test('GIVEN promise with extra properties THEN should forward these properties to function param inside <Else />', async () => {
        // eslint-disable-next-line prefer-promise-reject-errors
        const extendedPromise: ExtendablePromise<void> = Promise.reject();
        extendedPromise.testValue = 'TEST_VALUE';
        const wrapped: ReactWrapper = mount(
          <If condition={extendedPromise}>
            <Else>
              {(data: any, history: any, promise: any) => {
                data;
                history; // 'skip declared but value never read' error
                return <span>{promise.testValue}</span>;
              }}
            </Else>
          </If>
        );
        await waitForComponentToPaint(wrapped);
        expect(wrapped.containsMatchingElement(<span>{extendedPromise.testValue}</span>));
      });
    });
  });
});
