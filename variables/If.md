[**react-if**](../README.md)

***

[react-if](../globals.md) / If

# Variable: If

> `const` **If**: `FC`\<[`ComponentWithConditionPropsAsyncSupport`](../type-aliases/ComponentWithConditionPropsAsyncSupport.md)\>

Defined in: [src/If.tsx:19](https://github.com/romac/react-if/blob/867ff52735b63d78c1431c3e7287c0ec3650676b/src/If.tsx#L19)

If condition evaluates to true, renders the `<Then />` block will be rendered,
otherwise renders the `<Else />` block. Either block may be omitted.

This component can contain any number of `<Then />` or `<Else />` blocks,
but only the first block of the right type (either Then or Else, depending on the condition) will be rendered.

## Param

The props to pass down to the `<IF />` component, see [ComponentWithConditionProps](../type-aliases/ComponentWithConditionProps.md)
