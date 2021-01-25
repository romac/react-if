import React, { FC, Fragment } from 'react';

/**
 * Renders a React component while also checking whether the children are a function or not
 * @param props Props of the component to render
 */
export const render: FC = (props) => {
  if (typeof props.children === 'function') {
    return <Fragment>{props.children()}</Fragment>;
  }

  return <Fragment>{props.children || null}</Fragment>;
};
