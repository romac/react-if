import React, { Fragment } from 'react';
import type { FCWithImplicitChildren } from './types';

/**
 * Renders a React component while also checking whether the children are a function or not
 * @param props Props of the component to render
 */
export const render: FCWithImplicitChildren = (props) => {
  if (typeof props.children === 'function') {
    return <Fragment>{(props.children as CustomFunction)()}</Fragment>;
  }

  return <Fragment>{props.children || null}</Fragment>;
};

type CustomFunction = (...args: unknown[]) => JSX.Element;
