import { FC } from 'react';
import { render } from './render';

/** Must contain only a single child, which it renders as-is. Should not be used outside of an `<If />` block. */
export const Then: FC = props => render(props);
