import { PropsWithChildren } from 'react';

/**
 * Type for a value that can properly be parsed by `Boolean(...)`
 */
export type BooleanLike = boolean | string | number | null | undefined;

/**
 * Props for a React component that have both children
 * as well as a `condition` prop that is supported by this library
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ComponentWithConditionProps
  extends PropsWithChildren<{
    condition: (() => BooleanLike) | BooleanLike;
  }> {}
