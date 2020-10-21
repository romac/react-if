import { PropsWithChildren } from 'react';
export declare type BooleanLike = boolean | string | number | null | undefined;
export interface ComponentWithConditionProps extends PropsWithChildren<{
    condition: (() => BooleanLike) | BooleanLike;
}> {
}
//# sourceMappingURL=types.d.ts.map