import React, { FC, Fragment } from 'react';

export const render: FC = props => {
  if (typeof props.children === 'function') {
    return <Fragment>{props.children()}</Fragment>;
  }

  return <Fragment>{props.children || null}</Fragment>;
};
