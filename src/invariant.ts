/**
 * Handles errors by throwing them to the console.
 * `__DEV__` is replaced by tsdx using {@link https://www.npmjs.com/package/babel-plugin-dev-expression babel-plugin-dev-expressions}
 * which will ensure this entire throw is not present in production
 * @param condition The condition to check
 * @param message The message to throw if `condition` resolves to `true`
 */
export function invariant(condition: boolean, message: string): asserts condition {
  if (__DEV__) {
    if (condition) {
      throw new Error(message);
    }
  }
}
