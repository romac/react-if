import { render } from './render';
import type { FCWithImplicitChildren } from './types';

/**
 * Must contain only a single child, which it renders as-is.
 * Should not be used outside of an `<If />` block whose condition prop is a promise.
 * @param props The props to pass down to the `<Fallback />` component
 */
export const Fallback: FCWithImplicitChildren = (props) => render(props);
