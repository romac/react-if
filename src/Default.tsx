import { render } from './render';
import type { FCWithImplicitChildren } from './types';

/**
 * If no `<Case />` have its condition evaluates to true inside the parent `<Switch />`,
 * the first `<Default />` will be the only one rendered.
 * @param props The props to pass down to the `<Default />` component
 */
export const Default: FCWithImplicitChildren = (props) => render(props);

Default.defaultProps = {
  children: null
};
