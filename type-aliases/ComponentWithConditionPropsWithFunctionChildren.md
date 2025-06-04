[**react-if**](../README.md)

***

[react-if](../globals.md) / ComponentWithConditionPropsWithFunctionChildren

# Type Alias: ComponentWithConditionPropsWithFunctionChildren\<P\>

> **ComponentWithConditionPropsWithFunctionChildren**\<`P`\> = `P` & [`CustomPropsWithChildren`](CustomPropsWithChildren.md)\<\{ `condition`: () => [`BooleanLike`](BooleanLike.md) \| [`BooleanLike`](BooleanLike.md); \}\>

Defined in: [src/types.ts:29](https://github.com/romac/react-if/blob/06905daeb516e18ad5c4a2722e17279616240863/src/types.ts#L29)

Props for a React component that have both children
as well as a `condition` prop that is supported by this library

The children can also be in function style

## Type Parameters

### P

`P` = [`NonNullObject`](NonNullObject.md)
