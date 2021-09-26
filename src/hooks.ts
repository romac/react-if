import { useRef } from 'react';
import { shallowArraysEqual } from './utils';

/**
 * Calls a function only once during component lifecycle;
 * When dependency array is provided, will call the function again if at least one of the dependencies changed
 * @param callback The function to execute only once
 * @param dependencies A list of dependencies whose value, if changed since last call,
 * will trigger the execution of the callback
 */
export const useSingleton = (callback: () => any, dependencies: any[] = []) => {
  const hasRan = useRef<boolean>(false);
  const lastDependencies = useRef<any[]>([]);

  // Parameters type check
  if (typeof callback !== 'function') {
    throw new Error(`Incorrect callback parameter for useSingleton hook; expected a function, but got: '${typeof callback}'.`);
  }
  if (!Array.isArray(dependencies)) {
    throw new Error(`Incorrect dependencies parameter for useSingleton; expected an array, but got: '${typeof dependencies}'.`);
  }

  const hasDependencies = Array.isArray(dependencies) && dependencies.length > 0;
  if (hasDependencies) {
    // Has dependencies
    const hasAnyDependencyChanged = !shallowArraysEqual(lastDependencies.current, dependencies);
    if (hasAnyDependencyChanged) {
      // Any dep has changed => overwrite last dependencies and execute callback
      lastDependencies.current = dependencies;
    } else if (hasRan.current) {
      // No dep has changed => same behaviour as if no dependencies
      return;
    }
  } else if (hasRan.current) {
    // No dependencies
    return;
  }

  callback();
  hasRan.current = true;
};
