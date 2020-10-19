import { FC } from 'react';
import { render } from './render';
import { ComponentWithConditionProps } from './types';

/** If no `<Case />` have its condition evaluates to true inside the parent `<Switch />`, the first `<Default />` will be the only one rendered. */
export const Default: FC<ComponentWithConditionProps> = props => render(props);

Default.defaultProps = {
  children: null
};
