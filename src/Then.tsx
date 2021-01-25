import type { FC } from 'react';
import { render } from './render';

/**
 * Must contain only a single child, which it renders as-is.
 * Should not be used outside of an `<If />` block.
 * @param props The props to pass down to the `<Then />` component
 */
export const Then: FC = (props) => render(props);
