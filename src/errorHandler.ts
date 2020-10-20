/**
 * Handles errors by throwing errors, only when `NODE_ENV` is not `'production'`
 */
export const handleError = (errorMessage: string, errorCondition: boolean) => {
  if (process.env.NODE_ENV !== 'production' && errorCondition) {
    throw new Error(errorMessage);
  }
};
