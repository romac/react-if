import type { PropsWithChildren, ReactElement, ReactNode, ValidationMap, WeakValidationMap } from 'react';

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
 *
 * The children can also be in function style
 */
export type ComponentWithConditionPropsWithFunctionChildren<P = NonNullObject> = P &
  CustomPropsWithChildren<{
    condition: (() => BooleanLike) | BooleanLike;
  }>;

/**
 * Props for a React component that have both children
 * as well as a `condition` prop that is supported by this library
 */
export type ComponentWithConditionProps<P = NonNullObject> = P & PropsWithChildren<{ condition: (() => BooleanLike) | BooleanLike }>;

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
export type ComponentWithConditionPropsAsyncSupport<C extends 'with-function-children' | 'without-function-children'> =
  C extends 'with-function-children'
    ? ComponentWithConditionPropsWithFunctionChildren<AsyncSupportProps>
    : ComponentWithConditionProps<AsyncSupportProps>;

export type FCWithImplicitChildren<P = NonNullObject> = FunctionComponentWithImplicitChildren<P>;

interface FunctionComponentWithImplicitChildren<P = NonNullObject> {
  (props: CustomPropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  propTypes?: WeakValidationMap<P> | undefined;
  contextTypes?: ValidationMap<any> | undefined;
  defaultProps?: Partial<P> | undefined;
  displayName?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/ban-types
type NonNullObject = {} & object;

export type CustomPropsWithChildren<P> = P & { children?: ReactNode | undefined | ((...args: unknown[]) => JSX.Element) };
