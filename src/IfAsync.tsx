import React, { Fragment, useEffect, useMemo, useRef, useState, PropsWithChildren, ReactElement } from 'react';
import { Else } from './Else';
import { Fallback } from './Fallback';
import { useSingleton } from './hooks';
import { isThenable } from './isThenable';
import { Then } from './Then';
import type { AsyncSupportProps, CancellablePromise, ExtendablePromise } from './types';
import { createCancellablePromise } from './utils';

/**
 * Props for IfAsync
 */
interface Props<T> extends AsyncSupportProps, PropsWithChildren<{ promise: ExtendablePromise<T> }> {}

/**
 * Is included in the `<If />` component, rendered when the condition prop of `<If />` is a Promise;
 * Renders the Fallback component, if contains any, until provided promise is fulfilled;
 * Renders `<Then />` when promise is fulfilled, `<Else />` when rejected
 */

export function IfAsync<T = any>({ promise, keepAlive = false, children }: Props<T>) {
  const [isResolved, setIsResolved] = useState<null | boolean>(null);
  const [returnValue, setReturnValue] = useState(null);

  // Make promise cancellable
  const cancellablePromise = useMemo((): CancellablePromise => createCancellablePromise(promise), [promise]);
  const history = useRef<CancellablePromise[]>([]); // Keep history of promises

  // Handle unmount
  useEffect(() => {
    return () => {
      if (!keepAlive) {
        cancellablePromise.cancel();
      }
    };
  }, [cancellablePromise, cancellablePromise.promise, keepAlive]);

  // Await promise
  useSingleton(async () => {
    setIsResolved(null);
    setReturnValue(null);

    try {
      const data = await cancellablePromise.promise;
      setReturnValue(data);
      setIsResolved(true);
      history.current.push(cancellablePromise);
    } catch (error) {
      setReturnValue(error as any);
      setIsResolved(false);
      history.current.push(cancellablePromise);
    }
  }, [cancellablePromise.promise]);

  if (!children || !isThenable(promise)) {
    return null;
  }

  if (isResolved === null) {
    // Promise is pending
    const hasFallback = (React.Children.toArray(children) as ReactElement[]).find((c) => c.type === Fallback);
    return <Fragment>{hasFallback || null}</Fragment>;
  }

  if (!isResolved) {
    // Promise is fulfilled and rejected
    const hasElse = (React.Children.toArray(children) as ReactElement[]).find((c) => c.type === Else);
    if (!hasElse) return <Fragment>{null}</Fragment>;

    // Inject caught error
    let elseElement = hasElse;
    if (typeof hasElse.props.children === 'function') {
      elseElement = {
        ...hasElse,
        props: {
          ...hasElse.props,
          children: () => hasElse.props.children(returnValue, history.current, cancellablePromise.promise)
        }
      };
    }
    return <Fragment>{elseElement}</Fragment>;
  }

  // Promise is fulfilled and resolved
  const hasThen = (React.Children.toArray(children) as ReactElement[]).find((c) => c.type === Then);
  if (!hasThen) return <Fragment>{null}</Fragment>;

  // Inject promise return value
  let thenElement = hasThen;

  if (typeof hasThen.props.children === 'function') {
    thenElement = {
      ...hasThen,
      props: {
        ...hasThen.props,
        children: () => hasThen.props.children(returnValue, history.current, cancellablePromise.promise)
      }
    };
  }

  return <Fragment>{thenElement}</Fragment>;
}
