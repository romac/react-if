[**react-if**](../README.md)

***

[react-if](../globals.md) / ComponentWithConditionPropsWithFunctionChildren

# Type Alias: ComponentWithConditionPropsWithFunctionChildren\<P\>

> **ComponentWithConditionPropsWithFunctionChildren**\<`P`\> = `P` & [`CustomPropsWithChildren`](CustomPropsWithChildren.md)\<\{ `condition`: () => [`BooleanLike`](BooleanLike.md) \| [`BooleanLike`](BooleanLike.md); \}\>

Defined in: [src/types.ts:29](https://github.com/romac/react-if/blob/b45464e838dd2d0c922fcd39ecbf43f12df5e169/src/types.ts#L29)

Props for a React component that have both children
as well as a `condition` prop that is supported by this library

The children can also be in function style

## Type Parameters

### P

`P` = [`NonNullObject`](NonNullObject.md)
