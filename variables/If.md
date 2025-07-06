[**react-if**](../README.md)

***

[react-if](../globals.md) / If

# Variable: If

> `const` **If**: `FC`\<[`ComponentWithConditionPropsAsyncSupport`](../type-aliases/ComponentWithConditionPropsAsyncSupport.md)\>

Defined in: [src/If.tsx:19](https://github.com/romac/react-if/blob/5c6e978cf1563aa4f329bf34d7943cbce72b88db/src/If.tsx#L19)

If condition evaluates to true, renders the `<Then />` block will be rendered,
otherwise renders the `<Else />` block. Either block may be omitted.

This component can contain any number of `<Then />` or `<Else />` blocks,
but only the first block of the right type (either Then or Else, depending on the condition) will be rendered.

## Param

The props to pass down to the `<IF />` component, see [ComponentWithConditionProps](../type-aliases/ComponentWithConditionProps.md)
