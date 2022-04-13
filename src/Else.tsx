import { render } from './render';
import type { FCWithImplicitChildren } from './types';

/**
 * Must only contain a single child, which it renders as-is.
 * Should not be used outside of an `<If />` block.
 * @param props The props to pass down to the `<Else />` component
 */
export const Else: FCWithImplicitChildren = (props) => render(props);
