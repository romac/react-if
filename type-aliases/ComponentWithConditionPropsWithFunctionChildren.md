[**react-if**](../README.md)

***

[react-if](../globals.md) / ComponentWithConditionPropsWithFunctionChildren

# Type Alias: ComponentWithConditionPropsWithFunctionChildren\<P\>

> **ComponentWithConditionPropsWithFunctionChildren**\<`P`\> = `P` & [`CustomPropsWithChildren`](CustomPropsWithChildren.md)\<\{ `condition`: () => [`BooleanLike`](BooleanLike.md) \| [`BooleanLike`](BooleanLike.md); \}\>

Defined in: [src/types.ts:29](https://github.com/romac/react-if/blob/d4e642781214f59311f1912d5fec32e1e3837d6a/src/types.ts#L29)

Props for a React component that have both children
as well as a `condition` prop that is supported by this library

The children can also be in function style

## Type Parameters

### P

`P` = [`NonNullObject`](NonNullObject.md)
