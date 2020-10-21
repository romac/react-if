import { FC } from 'react';
import { getConditionResult } from './getConditionResults';
import { render } from './render';
import { ComponentWithConditionProps } from './types';

/** A shorthand for
 *
 * ```jsx
 * <If condition={...}>
 *     <Else>
 *         { ... }
 *     </Else>
 * </If>
 * ```
 *
 * The same rules apply to the child elements as with using the `<Else />` block.
 *
 * @param __namedParameters The props to pass down to the `<IF />` component, see {@link ComponentWithConditionProps}
 */
export const Unless: FC<ComponentWithConditionProps> = ({ condition, children }) => {
  const conditionResult = Boolean(getConditionResult(condition));

  return !conditionResult && children ? render({ children }) : null;
};

Unless.defaultProps = {
  children: null
};
