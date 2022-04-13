/**
 * The MIT License (MIT)
 *
 * Copyright © `2020` `The Sapphire Community and its contributors`
 *
 * Source: https://github.com/sapphiredev/utilities/blob/main/packages/utilities/src/lib/isThenable.ts
 * Full license: https://github.com/sapphiredev/utilities/blob/main/LICENSE.md
 */

/* eslint-disable @typescript-eslint/ban-types */

interface Thenable {
  then: Function;
  catch: Function;
}

/**
 * Verify if the input is a function.
 * @param input The function to verify
 */

export function isFunction(input: unknown): input is Function {
  return typeof input === 'function';
}

function hasThen(input: { then?: Function }): boolean {
  return Reflect.has(input, 'then') && isFunction(input.then);
}

function hasCatch(input: { catch?: Function }): boolean {
  return Reflect.has(input, 'catch') && isFunction(input.catch);
}

/**
 * Verify if an object is a promise.
 * @param input The promise to verify
 */
export function isThenable(input: unknown): input is Thenable {
  if (typeof input !== 'object' || input === null) return false;
  return input instanceof Promise || (input !== Promise.prototype && hasThen(input) && hasCatch(input));
}
