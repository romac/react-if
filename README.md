
# React If

[![npm badge](http://img.shields.io/npm/v/react-if.svg)](https://www.npmjs.com/package/react-if)
[![Build Status](https://travis-ci.org/romac/react-if.svg?branch=master&style=flat)](https://travis-ci.org/romac/react-if)
[![Issues](http://img.shields.io/github/issues/romac/react-if.svg?style=flat)](https://github.com/romac/react-if/issues)
![Status](https://img.shields.io/badge/status-inactive-lightgray.svg?style=flat)
![License](https://img.shields.io/badge/license-mit-brightgreen.svg?style=flat)
[![Contact](https://img.shields.io/badge/contact-@__romac-blue.svg?style=flat)](https://twitter.com/_romac)

Render React components conditionally.

## What does this component do

Take a look at the following presentational component, which contains a commonly used pattern for conditional rendering:

```javascript
const Bar = ({ name, age, drinkingAge }) => (
    <div>
        <Header />
        {
            age >= drinkingAge
                ? <span className="ok">Have a beer, {name}!</span>
                : <span className="not-ok">Sorry, {name}, you are not old enough.</span>
        }
        <Footer />
    </div>
)
```

With `React-If` you can rewrite this into a more readable, expressive format:

```javascript
const Bar = ({ name, age, drinkingAge }) => (
    <div>
        <Header />
        <If condition={ age >= drinkingAge }>
            <Then><span className="ok">Have a beer, {name}!</span></Then>
            <Else><span className="not-ok">Sorry, {name}, you are not old enough.</span></Else>
        </If>
        <Footer />
    </div>
)
```

## Delaying evaluation of children / condition

It is important to note that, because JavaScript is an eagearly evaluated language, children of both the `Then` and `Else` component and condition will be evaluated regardless of the value of the condition. Should that be an issue for performance reasons, one can wrap said children / condition in a [arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), to delay evaluation of the children / condition, as in the following example:


```javascript
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
        <If condition={!this.props.bears}>
          <Then>
            No bears
          </Then>

          <Else>
            <If condition={() => this.props.bears.length}>
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

And `this.props.bears.length` will not be called in the 2nd example.

## Installing and usage

### NPM:

`npm install react-if`

### Bower:

`bower install react-if`

```javascript
// ES2015
import { If, Then, Else, When, Unless, Switch, Case, Default } from 'react-if'

// CommonJS:
const { If, Then, Else, When, Unless, Switch, Case, Default } = require('react-if')

// Global
var If   = ReactIf.If
var Then = If.Then
var Else = If.Else
var When = If.When
var Unless = If.Unless
var Switch = If.Switch
var Case = If.Case
var Default = If.Default
```

## Examples

## Swich/Case/Default

```javascript
import React from 'react'
import { Switch, Case, Default } from 'react-if'

const myNumber = 3

const Example = () => (
    <div>
        <Switch>
          <Case condition={ myNumber === 9 }>
            This will be displayed if condition is matched
          </Case>
          <Case condition={ myNumber > 1 }>
            This will be displayed if condition is matched
          </Case>
          <Default>
            This will be displayed if no Case have matching condition
          </Default>
        </Switch>
    </div>
)
```

## Shorthands: When and Unless

```javascript
import React from 'react'
import { When, Unless } from 'react-if'

const someCondition = false

const Example = () => (
    <div>
        <When condition={ someCondition }>
            This will only be displayed, if the condition is TRUE
        </When>
    </div>
)

const AnotherExample = () => (
    <div>
        <Unless condition={ someCondition }>
            This will only be displayed, if the condition is FALSE
        </Unless>
    </div>
)
```

## API

### &lt;If /&gt;

| Property      | Type    |
| ------------- | ------- |
| `condition`   | Boolean |

If `condition` evaluates to `true`, renders the `<Then />` block will be rendered, otherwise renders the `<Else />` block. Either block may be omitted.

This component can contain any number of `<Then />` or `<Else />` blocks, but only the first block of the right type (either `Then` or `Else`, depending on the condition) will be rendered.

### &lt;Then /&gt;

Can contain any number of elements inside, which it renders as-is. It can also contain a function. Should not be used outside of an `<If />` block. It will only be displayed, if parent `If` block's condition is true.

### &lt;Else /&gt;

Can contain any number of elements inside, which it renders as-is. It can also contain a function. Should not be used outside of an `<If />` block. It will only be displayed, if parent `If` block's condition is false.

### &lt;Switch /&gt;

A container for `<Case condition={...}/>` and `<Default />` blocks. It will render **the first matching** `Case`, or **the first encountered** `Default` (, or null).

### &lt;Case /&gt;

| Property      | Type    |
| ------------- | ------- |
| `condition`   | Boolean |

If the `Case` is the first one to have its `condition` evaluates to `true` inside the parent `<Switch />` it will be the only rendered.

### &lt;Default /&gt;

If no `Case` have its `condition` evaluates to `true` inside the parent `<Switch />`, the first `Default` will be the only one rendered.

### &lt;When /&gt;

A shorthand for `<If condition={...}><Then>...</Then></If>`. The same rules apply to the child elements as with using the `Then` block.

### &lt;Unless /&gt;

A shorthand for `<If condition={...}><Else>...</Else></If>`. The same rules apply to the child elements as with using the `Else` block.

## License

**React If** is released under the [MIT license](http://romac.mit-license.org).
