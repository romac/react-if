import { FC } from 'react';
import { getConditionResult } from './getConditionResults';
import { render } from './render';
import { ComponentWithConditionProps } from './types';

/** A shorthand for
 *
 * ```
 * <If condition={...}>
 *     <Then>
 *         { ... }
 *     </Then>
 * </If>
 * ```
 *
 * The same rules apply to the child elements as with using the `<Then /`> block. */
export const When: FC<ComponentWithConditionProps> = ({ condition, children }) => {
  const conditionResult = Boolean(getConditionResult(condition));

  return !conditionResult && children ? render({ children }) : null;
};

When.defaultProps = {
  children: null
};
