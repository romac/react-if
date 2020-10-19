import { PropsWithChildren } from 'react';

export type BooleanLike = boolean | string | number | null | undefined;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ComponentWithConditionProps
  extends PropsWithChildren<{
    condition: (() => BooleanLike) | BooleanLike;
  }> {}
