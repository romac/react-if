import { render } from './render';
import type { FCWithImplicitChildren } from './types';

/**
 * Must contain only a single child, which it renders as-is.
 * Should not be used outside of an `<If />` block.
 * @param props The props to pass down to the `<Then />` component
 */
export const Then: FCWithImplicitChildren = (props) => render(props);
