import type { FC } from 'react';
import { render } from './render';

/**
 * Must contain only a single child, which it renders as-is.
 * Should not be used outside of an `<If />` block whose condition prop is a promise.
 * @param props The props to pass down to the `<Fallback />` component
 */
export const Fallback: FC = (props) => render(props);
