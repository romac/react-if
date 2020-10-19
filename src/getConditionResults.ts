import { BooleanLike } from './types';

export const getConditionResult = (condition: BooleanLike | ((...args: unknown[]) => BooleanLike)) => {
  const conditionResult = Boolean(typeof condition === 'function' ? condition() : condition);

  return conditionResult;
};
