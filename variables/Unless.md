[**react-if**](../README.md)

***

[react-if](../globals.md) / Unless

# Variable: Unless

> `const` **Unless**: `FC`\<[`ComponentWithConditionPropsWithFunctionChildren`](../type-aliases/ComponentWithConditionPropsWithFunctionChildren.md)\>

Defined in: [src/Unless.tsx:20](https://github.com/romac/react-if/blob/1c4104027e4ac21b8809c71ecc3a2c3af48279c8/src/Unless.tsx#L20)

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
