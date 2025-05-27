**react-if**

***

# React If

[![npm](https://img.shields.io/npm/v/react-if?logo=npm)](https://www.npmjs.com/package/react-if)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-if?label=bundle%20size&logo=webpack)](https://bundlephobia.com/result?p=react-if)
[![Continuous Integration](https://github.com/romac/react-if/workflows/Continuous%20Integration/badge.svg)](https://github.com/romac/react-if/actions)
[![Issues](http://img.shields.io/github/issues/romac/react-if.svg?style=flat&logo=github&logoColor=959DA5&labelColor=2D3339)](https://github.com/romac/react-if/issues)
[![License](https://img.shields.io/github/license/romac/react-if?logo=github&logoColor=959DA5&labelColor=2D3339)](https://github.com/romac/react-if/blob/master/LICENSE.md)
[![Contact](https://img.shields.io/badge/contact-@__romac-blue.svg?style=flat&logo=twitter)](https://twitter.com/_romac)
[![Contact](https://img.shields.io/badge/contact-@favna__-blue.svg?style=flat&logo=twitter)](https://twitter.com/fanva_)

Render React components conditionally.

## What does this component do

Take a look at the following presentational component, which contains a commonly used pattern for conditional rendering:

```jsx
const Bar = ({ name, age, drinkingAge }) => (
  <div>
    <Header />
    {age >= drinkingAge ? <span className="ok">Have a beer, {name}!</span> : <span className="not-ok">Sorry, {name}, you are not old enough.</span>}
    <Footer />
  </div>
);
```

With `React-If` you can rewrite this into a more readable, expressive format:

```jsx
const Bar = ({ name, age, drinkingAge }) => (
  <div>
    <Header />
    <If condition={age >= drinkingAge}>
      <Then>
        <span className="ok">Have a beer, {name}!</span>
      </Then>
      <Else>
        <span className="not-ok">Sorry, {name}, you are not old enough.</span>
      </Else>
    </If>
    <Footer />
  </div>
);
```

## Delaying evaluation of children / condition

It is important to note that, because JavaScript is an eagerly evaluated language, children of both the `Then` and `Else` component and condition will be evaluated regardless of the value of the condition. Should that be an issue for performance reasons, one can wrap said children / condition in a [arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), to delay evaluation of the children / condition, as in the following example:

```jsx
const renderData = (data) => {
  val computed = /* expensive computation */
  return <span>Here is the result: {computed}</span>;
};

const Foo = ({ data }) => (
    <div>
        <If condition={false}>
            <Then>{() =>
              renderData(data)
            }</Then>
            <Else>
              Nothing to see here
            </Else>
        </If>
        <If condition={!props.bears}>
          <Then>
            No bears
          </Then>

          <Else>
            <If condition={() => props.bears.length}>
              Empty bears array
            </If>
            <Else>
              // Display bears
            </Else>
          </Else>
        </If>
    </div>
)
```

By doing so, `renderData` will not be called in the 1st example.

And `props.bears.length` will not be called in the 2nd example.

## Installing and usage

### NPM:

`npm install react-if`
Or with yarn: `yarn add react-if`

```jsx
// ES2015
import { If, Then, Else, When, Unless, Switch, Case, Default } from 'react-if';

// CommonJS:
const { If, Then, Else, When, Unless, Switch, Case, Default } = require('react-if');
```

## Examples

## Switch/Case/Default

```jsx
import React from 'react';
import { Switch, Case, Default } from 'react-if';

const myNumber = 3;

const Example = () => (
  <div>
    <Switch>
      <Case condition={myNumber === 9}>This will be displayed if condition is matched</Case>
      <Case condition={myNumber > 1}>This will be displayed if condition is matched</Case>
      <Default>This will be displayed if no Case have matching condition</Default>
    </Switch>
  </div>
);
```

## Shorthands: When and Unless

```jsx
import React from 'react';
import { When, Unless } from 'react-if';

const someCondition = false;

const Example = () => (
  <div>
    <When condition={someCondition}>This will only be displayed, if the condition is TRUE</When>
  </div>
);

const AnotherExample = () => (
  <div>
    <Unless condition={someCondition}>This will only be displayed, if the condition is FALSE</Unless>
  </div>
);
```

## Asynchronous condition

```jsx
import React from 'react';
import { If, Fallback, Then, Else } from 'react-if';

const Example = () => {
  const fetchData = () => {
    // Return promise
  };

  return (
    <div>
      <If condition={fetchData()}>
        <Fallback>Loading data ...</Fallback>
        <Then>
          {(data) => (
            <span>Here is your data: {data}</span>
          )}
        </Then>
        <Else>
          {(error) => (
            <span>Failed to load data because "{error}"</span>
          )}
        </Else>
      </If>
    </div>
  );
});
```

## API

**_Note: For a fully auto-generated API, see [the github pages website](https://romac.github.io/react-if)_**

### &lt;If /&gt;

| Property    | Type            | Default |
| ----------- | --------------- | ------- |
| `condition` | Boolean/Promise |         |
| `keepAlive` | Boolean         | false   |

If `condition` evaluates to `true`, renders the `<Then />` block will be rendered, otherwise renders the `<Else />` block. Either block may be omitted.

This component can contain any number of `<Then />` or `<Else />` blocks, but only the first block of the right type (either `Then` or `Else`, depending on the condition) will be rendered.

When passing a Promise to `condition`, renders the `Fallback` block while the Promise is pending, the `<Then />` block once Promise is resolved, and the `<Else />` block when Promise is rejected.
The return value of the `Promise` can be retrieved within the `<Then />` and `<Else />` blocks; a render function must be child of these blocks.

```jsx
<Then>{(returnValue, promiseHistory, cancellablePromise) => <span>{returnValue}</span>}</Then>
```

The parameters of this render function are:

- `returnValue`: The return value of the `Promise` (for the `<Then />` block) or the error (for the `<Else />` block);
- `promiseHistory`: an Array of all the Promises that were ever passed to `<If />`. It contains cancellablePromise Objects, that have a promise, as well as a `cancel` method used to cancel the promise;
- `cancellablePromise`: the cancellablePromise Object containing the promise that caused the rendering of this `<Then />|<Else />` block;

If the `keepAlive` prop evaluates to `false`, each rerender of the `<If />` component will automatically ignore the previous Promise if it was still pending.

### &lt;Then /&gt;

Can contain any number of elements inside, which it renders as-is. It can also contain a function. Should not be used outside of an `<If />` block. It will only be displayed, if parent `If` block's condition is true.

### &lt;Else /&gt;

Can contain any number of elements inside, which it renders as-is. It can also contain a function. Should not be used outside of an `<If />` block. It will only be displayed, if parent `If` block's condition is false.

### &lt;Switch /&gt;

A container for `<Case condition={...}/>` and `<Default />` blocks. It will render **the first matching** `Case`, or **the first encountered** `Default` (, or null).

### &lt;Case /&gt;

| Property    | Type    |
| ----------- | ------- |
| `condition` | Boolean |

If the `Case` is the first one to have its `condition` evaluates to `true` inside the parent `<Switch />` it will be the only rendered.

### &lt;Default /&gt;

If no `Case` have its `condition` evaluates to `true` inside the parent `<Switch />`, the first `Default` will be the only one rendered.

### &lt;When /&gt;

A shorthand for `<If condition={...}><Then>...</Then></If>`. The same rules apply to the child elements as with using the `Then` block.

### &lt;Unless /&gt;

A shorthand for `<If condition={...}><Else>...</Else></If>`. The same rules apply to the child elements as with using the `Else` block.

## License

**React If** is released under the [MIT license](http://romac.mit-license.org).

## Contributors

Please make sure to read the [Contributing Guide][contributing] before making a pull request.

Thank you to all the people who already contributed to react-if!

<a href="https://github.com/romac/react-if/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=romac/react-if" />
</a>

[contributing]: https://github.com/romac/react-if/blob/master/.github/CONTRIBUTING.md
