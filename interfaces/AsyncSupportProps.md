[**react-if**](../README.md)

***

[react-if](../globals.md) / AsyncSupportProps

# Interface: AsyncSupportProps

Defined in: [src/types.ts:43](https://github.com/romac/react-if/blob/d89bda068d002b9b0761f1d92c5053e5fad86738/src/types.ts#L43)

Async related props

## Properties

### keepAlive?

> `optional` **keepAlive**: `boolean`

Defined in: [src/types.ts:49](https://github.com/romac/react-if/blob/d89bda068d002b9b0761f1d92c5053e5fad86738/src/types.ts#L49)

- False (default): promises are cancelled before each unmount
- True: promises can be fulfilled even after a
component unmount or a change to promise prop
