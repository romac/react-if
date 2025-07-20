[**react-if**](../README.md)

***

[react-if](../globals.md) / AsyncSupportProps

# Interface: AsyncSupportProps

Defined in: [src/types.ts:43](https://github.com/romac/react-if/blob/d4e642781214f59311f1912d5fec32e1e3837d6a/src/types.ts#L43)

Async related props

## Properties

### keepAlive?

> `optional` **keepAlive**: `boolean`

Defined in: [src/types.ts:49](https://github.com/romac/react-if/blob/d4e642781214f59311f1912d5fec32e1e3837d6a/src/types.ts#L49)

- False (default): promises are cancelled before each unmount
- True: promises can be fulfilled even after a
component unmount or a change to promise prop
