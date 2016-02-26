
# React If [![npm badge](http://img.shields.io/npm/v/react-if.svg)](https://www.npmjs.com/package/react-if)

Render React components conditionally.

This component turns this

```jsx
render() {
    return (
        <div>
            <Header />
            {this.renderBody()}
            <Footer />
        </div>
    );
},

renderBody() {
 return (this.props.age >= this.props.drinkingAge)
    ? <span class="ok">Have a beer, {this.props.name}!</span>
    : <span class="not-ok">Sorry {this.props.name } you are not old enough.</span>;
}
```

into this

```jsx
render() {
    return (
        <div>
            <Header />
            <If condition={ this.props.age >= this.props.drinkingAge }>
                <Then><span class="ok">Have a beer, {this.props.name}!</span></Then>
                <Else>{() =>
                  <span>Sorry, {this.props.name}, you are not old enough.</span>
                }</Else>
            </If>
            <Footer />
        </div>
    );
}
```

## Install

### NPM:

    npm install react-if

### Bower:

    bower install react-if


## Example

```jsx
import React from 'react';
import { If, Then, Else } from 'react-if';

class Beer extends React.Component {

    render() {
        return (
            <div>
                <If condition={ this.props.age >= 16 }>
                    <Then>Have a beer, {this.props.name}!</Then>
                    <Else>{() => // will only be evaluated if the condition fails.
                       <span>Sorry, {this.props.name}, you are not old enough.</span>
                    }</Else>
                </If>
            </div>
        );
    }

});
```

```jsx
// ES2015
import { If, Then, Else } from 'react-if';

// CommonJS:
const { If, Then, Else } = require('react-if');

// Global
var If   = ReactIf.If;
var Then = If.Then;
var Else = If.Else;
```

## API

### &lt;If /&gt;

| Property        | Type  |
| ------------- | ------- |
| `condition`   | Boolean |

If `condition` evaluates to `true`, renders the `<Then />` block will be rendered, otherwise renders the `<Else />` block. Either block may be omitted.

This component can contain any number of `<Then />` or `<Else />` blocks, but only the first block of the right type (either `Then` or `Else`, depending on the condition) will be rendered.

### &lt;Then /&gt;
Must contain only a single child, which it renders as-is. Should not be used outside of an `<If />` block.

### &lt;Else /&gt;
Must only contain a single child, which it renders as-is. Should not be used outside of an `<If />` block.

## License

**React If** is released under the [MIT license](http://romac.mit-license.org).

