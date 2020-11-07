/**
 * Handles errors by throwing them to the console.
 * `__DEV__` is replaced by tsdx using {@link https://www.npmjs.com/package/babel-plugin-dev-expression babel-plugin-dev-expressions}
 * which will ensure this entire throw is not present in production
 * @param condition The condition to check
 * @param message The message to throw if `condition` resolves to `true`
 */
export function tinyWarning(condition: boolean, message: string): asserts condition {
  if (__DEV__) {
    if (condition) {
      // check console for IE9 support which provides console
      // only with open devtools

      if (typeof console !== 'undefined') {
        console.warn(message);
      }

      // Throwing an error and catching it immediately to improve debugging
      // Users can utilize 'pause on caught exceptions' to get into this throw
      try {
        throw new Error(message);
      } catch (x) {
        // noop
      }
    }
  }
}
