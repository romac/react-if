import type { PropsWithChildren } from 'react';

/**
 * Type for a value that can properly be parsed by `Boolean(...)`
 */
export type BooleanLike = boolean | string | number | null | undefined | ExtendablePromise<any>;

/**
 * A Promise that can have additional properties
 */
export interface ExtendablePromise<T> extends Promise<T> {
  [index: string]: any;
}

/**
 * Type for a promise that is cancellable
 */
export interface CancellablePromise {
  promise: ExtendablePromise<any>;
  cancel: () => void;
}

/**
 * Props for a React component that have both children
 * as well as a `condition` prop that is supported by this library
 */
export interface ComponentWithConditionProps extends PropsWithChildren<{ condition: (() => BooleanLike) | BooleanLike }> {}

/**
 * Async related props
 */
export interface AsyncSupportProps {
  /**
   * - False (default): promises are cancelled before each unmount
   * - True: promises can be fulfilled even after a
   * component unmount or a change to promise prop
   */
  keepAlive?: boolean;
}

/**
 * Extend ComponentWithConditionProps
 * to also support async
 */
export interface ComponentWithConditionPropsAsyncSupport extends ComponentWithConditionProps, AsyncSupportProps {}
