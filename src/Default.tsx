import type { FC } from 'react';
import { render } from './render';

/**
 * If no `<Case />` have its condition evaluates to true inside the parent `<Switch />`,
 * the first `<Default />` will be the only one rendered.
 * @param props The props to pass down to the `<Default />` component
 */
export const Default: FC = (props) => render(props);

Default.defaultProps = {
  children: null
};
