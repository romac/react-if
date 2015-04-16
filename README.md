
# React If ![npm badge](http://img.shields.io/npm/v/react-if.svg)

Render React components conditionally.

This component helps you turn this

```javascript
render: function() {
    return (
        <div>
            <Header />
            {this.renderBody()}
            </Footer>
        </div>
    );
},

renderBody: function() {
 return (this.props.age >= this.props.drinkingAge)
    ? <span class="ok">Have a beer, {this.props.name}!</span>
    : <span class="not-ok">Sorry {this.props.name } you are not old enough.</span>;
}
```

into this

```javascript
render: function() {
    return (
        <div>
            <Header />
            <If condition={ this.props.age >= this.props.drinkingAge }>
                <Then><span class="ok">Have a beer, {this.props.name}!</span></Then>
                <Else><span class="not-ok">Sorry {this.props.name}, you are not old enough.</span></Else>
            </If>
            </Footer>
        </div>
    );
}
```

## Caveats

With this approach to conditional elements, children of either branch will always be evaluated no matter what. This can be an issue eg. if you're testing an object for nullity, and then try to access one of its property inside of the `Then` branch. See this [StackOverflow discussion](http://stackoverflow.com/questions/25224793/reactjs-creating-a-if-component-a-good-idea) as well as [issue #1](https://github.com/romac/react-if/issues/1) for more informations.

## Install

### NPM:

    npm install react-if

### Bower:

    bower install react-if


## Example

```javascript
// Browserify:
var If = require('react-if');
var Then = If.Then;
var Else = If.Else;

// Otherwise
var If = ReactIf;
var Then = If.Then;
var Else = Else.Then;

var Beer = React.createClass({
    
    getDefaultProps: function() {
        return {
            drinkingAge: 16 // Yay, Switzerland!
        };
    },
    
    render: function() {
        return (
            <div>
                <If condition={ this.props.age >= this.props.drinkingAge }>
                    <Then>Have a beer, {this.props.name}!</Then>
                    <Else>Sorry {this.props.name}, you are not old enough.</Else>
                </If>
            </div>
        );
    }
        
});
```

## API

### &lt;If /&gt;

| Property        | Type  |
| ------------- | ------- |
| `condition`   | Boolean |

If `condition` evaluates to `true`, renders the `<Then />` block will be rendered, otherwise renders the `<Else />` block.

This component can contain any number of `<Then />` or `<Else />` blocks, but only the first block of the right type (either `Then` or `Else`, depending on the condition) will be rendered.

### &lt;Then /&gt;
Must contain only a single child, which it renders as-is. Should not be used outside of an `<If />` block.

### &lt;Else /&gt;
Must only contain a single child, which it renders as-is. Should not be used outside of an `<If />` block.

## License

**React If** is released under the [MIT license](http://romac.mit-license.org).
