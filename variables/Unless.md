[**react-if**](../README.md)

***

[react-if](../globals.md) / Unless

# Variable: Unless

> `const` **Unless**: `FC`\<[`ComponentWithConditionPropsWithFunctionChildren`](../type-aliases/ComponentWithConditionPropsWithFunctionChildren.md)\>

Defined in: [src/Unless.tsx:20](https://github.com/romac/react-if/blob/7f5a5de70be325b3a7ba3ced7028e8435d9fc3e9/src/Unless.tsx#L20)

A shorthand for

```jsx
<If condition={...}>
    <Else>
        { ... }
    </Else>
</If>
```

The same rules apply to the child elements as with using the `<Else />` block.

## Param

The props to pass down to the `<IF />` component, see [ComponentWithConditionProps](../type-aliases/ComponentWithConditionProps.md)
