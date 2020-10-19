import { FC } from 'react';
import { render } from './render';

/** Must only contain a single child, which it renders as-is. Should not be used outside of an `<If />` block. */
export const Else: FC = props => render(props);
