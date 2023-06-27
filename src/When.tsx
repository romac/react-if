import type { FC } from 'react';
import { getConditionResult } from './getConditionResults';
import { render } from './render';
import type { ComponentWithConditionPropsWithFunctionChildren } from './types';

/** A shorthand for
 *
 * ```jsx
 * <If condition={...}>
 *     <Then>
 *         { ... }
 *     </Then>
 * </If>
 * ```
 *
 * The same rules apply to the child elements as with using the `<Then /`> block.
 *
 * @param __namedParameters The props to pass down to the `<IF />` component, see {@link ComponentWithConditionProps}
 */
export const When: FC<ComponentWithConditionPropsWithFunctionChildren> = ({ condition, children }) => {
  const conditionResult = Boolean(getConditionResult(condition));

  return conditionResult && children ? render({ children }) : null;
};
