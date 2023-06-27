import type { FC } from 'react';
import { render } from './render';
import type { ComponentWithConditionPropsWithFunctionChildren } from './types';

/**
 * If the `<Case />` is the first one to have its condition evaluates to true
 * inside the parent `<Switch />` it will be the only rendered.
 * @param props The props to pass down to the `<Case />` component
 */
export const Case: FC<ComponentWithConditionPropsWithFunctionChildren> = ({ children = null }) => {
  return render({ children });
};
