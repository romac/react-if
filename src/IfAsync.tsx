import * as React from 'react';
import { Fragment, useEffect, useMemo, useRef, useState, type PropsWithChildren, type ReactElement } from 'react';
import { Else } from './Else';
import { Fallback } from './Fallback';
import { Then } from './Then';
import { useSingleton } from './hooks';
import { isThenable } from './isThenable';
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
    const hasElseProps = hasElse.props as { children: any };
    if (typeof hasElseProps.children === 'function') {
      elseElement = {
        ...hasElse,
        props: {
          ...hasElseProps,
          children: () => hasElseProps.children(returnValue, history.current, cancellablePromise.promise)
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
  const hasThenProps = hasThen.props as { children: any };
  if (typeof hasThenProps.children === 'function') {
    thenElement = {
      ...hasThen,
      props: {
        ...hasThenProps,
        children: () => hasThenProps.children(returnValue, history.current, cancellablePromise.promise)
      }
    };
  }

  return <Fragment>{thenElement}</Fragment>;
}
