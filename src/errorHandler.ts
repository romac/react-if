/**
 * Handles errors by throwing them to the console.
 * __DEV__ is replaced by tsdx using {@link https://www.npmjs.com/package/babel-plugin-dev-expression babel-plugin-dev-expressions}
 * which will ensure this entire throw is not present in production
 */
export const handleError = (errorMessage: string, errorCondition: boolean) => {
  if (__DEV__) {
    if (errorCondition) {
      throw new Error(errorMessage);
    }
  }
};
