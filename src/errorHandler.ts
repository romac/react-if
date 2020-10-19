export const handleError = (errorMessage: string) => {
  if (process.env.NODE_ENV !== 'production') {
    throw new Error(errorMessage);
  }
};
