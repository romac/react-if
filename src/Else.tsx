import type { FC } from 'react';
import { render } from './render';

/**
 * Must only contain a single child, which it renders as-is.
 * Should not be used outside of an `<If />` block.
 * @param props The props to pass down to the `<Else />` component
 */
export const Else: FC = (props) => render(props);
