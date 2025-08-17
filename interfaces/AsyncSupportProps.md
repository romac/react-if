[**react-if**](../README.md)

***

[react-if](../globals.md) / AsyncSupportProps

# Interface: AsyncSupportProps

Defined in: [src/types.ts:43](https://github.com/romac/react-if/blob/87e99abf972946d48fe86104b6f957c6d270c935/src/types.ts#L43)

Async related props

## Properties

### keepAlive?

> `optional` **keepAlive**: `boolean`

Defined in: [src/types.ts:49](https://github.com/romac/react-if/blob/87e99abf972946d48fe86104b6f957c6d270c935/src/types.ts#L49)

- False (default): promises are cancelled before each unmount
- True: promises can be fulfilled even after a
component unmount or a change to promise prop
