import { isThenable } from './isThenable';
import type { CancellablePromise, ExtendablePromise } from './types';

/**
 * Compare two arrays without checking for possible nested properties
 * @param a Array to compare with b
 * @param b Array to compare with a
 * @returns True if arrays are identical, false if they are different
 */
export const shallowArraysEqual = (a: any[], b: any[]): boolean => {
  if (!Array.isArray(a) || !Array.isArray(b)) throw new Error('shallowArraysEqual only accepts arrays as parameters');
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

/**
 * Create a CancellablePromise from a native Promise
 * @param promise The promise object to wrap
 * @returns Return value is an object of type CancellablePromise, with 2 properties:
 * - promise: a promise that can be left pending
 * - cancel: the function to use for cancelling the returned promise
 */
export const createCancellablePromise = <T>(promise: ExtendablePromise<T>): CancellablePromise => {
  if (!isThenable(promise)) {
    throw new Error('Argument of createCancellablePromise should be a Promise');
  }

  const isCancelled = { value: false };
  const wrappedPromise: ExtendablePromise<T> = new Promise(async (res, rej) => {
    try {
      const d = await promise;
      return !isCancelled.value && res(d);
    } catch (error) {
      !isCancelled.value && rej(error);
    }
  });

  // Forward potential additional properties
  Object.keys(promise).forEach((key) => {
    wrappedPromise[key] = promise[key];
  });

  return {
    promise: wrappedPromise,
    cancel: () => {
      isCancelled.value = true;
    }
  };
};
