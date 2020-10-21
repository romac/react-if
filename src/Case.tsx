import { FC } from 'react';
import { render } from './render';
import { ComponentWithConditionProps } from './types';

/**
 * If the `<Case />` is the first one to have its condition evaluates to true
 * inside the parent `<Switch />` it will be the only rendered.
 * @param props The props to pass down to the `<Case />` component
 */
export const Case: FC<ComponentWithConditionProps> = props => render(props);

Case.defaultProps = {
  children: null
};
