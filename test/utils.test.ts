import { isThenable } from '../src/isThenable';
import type { CancellablePromise, ExtendablePromise } from '../src/types';
import { createCancellablePromise, shallowArraysEqual } from '../src/utils';

describe('utils', () => {
  describe('shallowArraysEqual', () => {
    test('GIVEN any non Array parameter THEN should throw an error', () => {
      const undef = undefined as any;
      const one = 1 as any;
      expect(() => shallowArraysEqual(undef, undef)).toThrow();
      expect(() => shallowArraysEqual(one, [])).toThrow();
    });

    test('GIVEN two arrays THEN should return true if arrays are equal', () => {
      expect(shallowArraysEqual([], [])).toBe(true);
      expect(shallowArraysEqual([1, 2], [1, 2])).toBe(true);
      expect(shallowArraysEqual(['a', 'b', 'c'], ['a', 'b', 'c'])).toBe(true);
      const obj = {};
      expect(shallowArraysEqual([obj], [obj])).toBe(true);
      const objWithProperties = { a: 1, b: { a: 2, b: [3, 4] } };
      expect(shallowArraysEqual([objWithProperties], [objWithProperties])).toBe(true);
      expect(shallowArraysEqual([true, false], [true, false])).toBe(true);
    });

    test('GIVEN two arrays THEN should return false if arrays are not equal', () => {
      expect(shallowArraysEqual([], [1])).toBe(false);
      expect(shallowArraysEqual(['a', 'b', 'c'], ['c', 'b', 'a'])).toBe(false);
      const obj1 = {};
      const obj2 = {};
      expect(shallowArraysEqual([obj1], [obj2])).toBe(false);
    });
  });

  describe('createCancellablePromise', () => {
    test('GIVEN non Promise object THEN should throw an error', () => {
      const undef = undefined as any;
      const string = 'string' as any;
      expect(() => createCancellablePromise(undef)).toThrow();
      expect(() => createCancellablePromise(string)).toThrow();
    });

    test('GIVEN Promise THEN should return a CancellablePromise object', () => {
      const cancellablePromise: CancellablePromise = createCancellablePromise(Promise.resolve());
      expect(typeof cancellablePromise?.cancel === 'function').toBe(true);
      expect(isThenable(cancellablePromise?.promise)).toBe(true);
    });

    test('GIVEN Promise with extra properties THEN should forward properties to returned promise', () => {
      const propValue = 'PROP_VALUE';
      const nativePromise: ExtendablePromise<void> = Promise.resolve();
      nativePromise.prop = propValue;
      const cancellablePromise: CancellablePromise = createCancellablePromise(nativePromise);
      expect(cancellablePromise?.promise?.prop === propValue).toBe(true);
    });

    test('GIVEN CancellablePromise THEN cancel method should cancel pending promise', () => {
      jest.useFakeTimers();
      const spy = jest.fn();
      const delay = 1000;
      const nativePromise: Promise<void> = new Promise((resolve) => {
        setTimeout(resolve, delay);
      });
      const cancellablePromise: CancellablePromise = createCancellablePromise(nativePromise);

      setTimeout(() => cancellablePromise.cancel(), delay / 2);
      cancellablePromise.promise.then(spy).catch(() => false);

      jest.advanceTimersByTime(delay);
      expect(spy).not.toHaveBeenCalled();

      jest.useRealTimers();
    });
  });
});
