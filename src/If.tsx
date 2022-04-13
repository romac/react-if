import React, { Fragment, type FC, type ReactElement } from 'react';
import { Else } from './Else';
import { Fallback } from './Fallback';
import { getConditionResult } from './getConditionResults';
import { IfAsync } from './IfAsync';
import { isThenable } from './isThenable';
import { Then } from './Then';
import { tinyWarning } from './tinyWarning';
import type { ComponentWithConditionPropsAsyncSupport, ExtendablePromise } from './types';

/**
 * If condition evaluates to true, renders the `<Then />` block will be rendered,
 * otherwise renders the `<Else />` block. Either block may be omitted.
 *
 * This component can contain any number of `<Then />` or `<Else />` blocks,
 * but only the first block of the right type (either Then or Else, depending on the condition) will be rendered.
 * @param __namedParameters The props to pass down to the `<IF />` component, see {@link ComponentWithConditionProps}
 */
export const If: FC<ComponentWithConditionPropsAsyncSupport<'without-function-children'>> = ({ condition, keepAlive = false, children }) => {
  if (!children) {
    return null;
  }

  tinyWarning(
    (!Array.isArray(children) && !((children as ReactElement).type === Else || (children as ReactElement).type === Then)) ||
      !(React.Children.toArray(children) as ReactElement[]).every((child) => child.type === Else || child.type === Then || child.type === Fallback),
    'The <If> component should contain <Then /> <Else /> or <Fallback /> components as its children'
  );

  if (isThenable(condition)) {
    return (
      <IfAsync promise={condition as ExtendablePromise<any>} keepAlive={keepAlive}>
        {children}
      </IfAsync>
    );
  }

  const conditionResult = getConditionResult(condition);

  return <Fragment>{(React.Children.toArray(children) as ReactElement[]).find((c) => (c.type !== Else) !== !conditionResult) || null}</Fragment>;
};
