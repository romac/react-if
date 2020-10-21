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
    {age >= drinkingAge ? (
      <span className="ok">Have a beer, {name}!</span>
    ) : (
      <span className="not-ok">Sorry, {name}, you are not old enough.</span>
    )}
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

## Swich/Case/Default

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

## API

***Note: For a fully auto-generated API, see [the github pages website](https://romac.github.io/react-if)***

### &lt;If /&gt;

| Property    | Type    |
| ----------- | ------- |
| `condition` | Boolean |

If `condition` evaluates to `true`, renders the `<Then />` block will be rendered, otherwise renders the `<Else />` block. Either block may be omitted.

This component can contain any number of `<Then />` or `<Else />` blocks, but only the first block of the right type (either `Then` or `Else`, depending on the condition) will be rendered.

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

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://romac.me/"><img src="https://avatars2.githubusercontent.com/u/106849?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Romain Ruetschi</b></sub></a><br /><a href="https://github.com/romac/react-if/commits?author=romac" title="Code">💻</a> <a href="https://github.com/romac/react-if/commits?author=romac" title="Documentation">📖</a> <a href="#example-romac" title="Examples">💡</a> <a href="#ideas-romac" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-romac" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-romac" title="Maintenance">🚧</a> <a href="#projectManagement-romac" title="Project Management">📆</a> <a href="https://github.com/romac/react-if/pulls?q=is%3Apr+reviewed-by%3Aromac" title="Reviewed Pull Requests">👀</a> <a href="#question-romac" title="Answering Questions">💬</a> <a href="https://github.com/romac/react-if/commits?author=romac" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://favware.tech/"><img src="https://avatars3.githubusercontent.com/u/4019718?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jeroen Claassens</b></sub></a><br /><a href="https://github.com/romac/react-if/commits?author=Favna" title="Code">💻</a> <a href="https://github.com/romac/react-if/commits?author=Favna" title="Documentation">📖</a> <a href="#example-Favna" title="Examples">💡</a> <a href="#infra-Favna" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-Favna" title="Maintenance">🚧</a> <a href="#projectManagement-Favna" title="Project Management">📆</a> <a href="https://github.com/romac/react-if/pulls?q=is%3Apr+reviewed-by%3AFavna" title="Reviewed Pull Requests">👀</a> <a href="#question-Favna" title="Answering Questions">💬</a> <a href="https://github.com/romac/react-if/commits?author=Favna" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/cyrilchapon"><img src="https://avatars1.githubusercontent.com/u/10728426?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Cyril CHAPON</b></sub></a><br /><a href="https://github.com/romac/react-if/commits?author=cyrilchapon" title="Code">💻</a> <a href="https://github.com/romac/react-if/commits?author=cyrilchapon" title="Documentation">📖</a> <a href="https://github.com/romac/react-if/commits?author=cyrilchapon" title="Tests">⚠️</a></td>
    <td align="center"><a href="http://twitter.com/tim_jacobi"><img src="https://avatars2.githubusercontent.com/u/2023165?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Tim Jacobi</b></sub></a><br /><a href="https://github.com/romac/react-if/commits?author=timjacobi" title="Code">💻</a> <a href="https://github.com/romac/react-if/commits?author=timjacobi" title="Documentation">📖</a> <a href="https://github.com/romac/react-if/commits?author=timjacobi" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/meszaros-lajos-gyorgy"><img src="https://avatars3.githubusercontent.com/u/2386064?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Lajos György Mészáros</b></sub></a><br /><a href="https://github.com/romac/react-if/commits?author=meszaros-lajos-gyorgy" title="Code">💻</a> <a href="https://github.com/romac/react-if/commits?author=meszaros-lajos-gyorgy" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/Rleahy22"><img src="https://avatars2.githubusercontent.com/u/3144003?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ryan Leahy</b></sub></a><br /><a href="https://github.com/romac/react-if/commits?author=Rleahy22" title="Code">💻</a> <a href="https://github.com/romac/react-if/commits?author=Rleahy22" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/pronebird"><img src="https://avatars2.githubusercontent.com/u/704044?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Andrej Mihajlov</b></sub></a><br /><a href="#platform-pronebird" title="Packaging/porting to new platform">📦</a> <a href="https://github.com/romac/react-if/commits?author=pronebird" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/ejbp"><img src="https://avatars0.githubusercontent.com/u/2060105?v=4?s=100" width="100px;" alt=""/><br /><sub><b>While True</b></sub></a><br /><a href="https://github.com/romac/react-if/issues?q=author%3Aejbp" title="Bug reports">🐛</a> <a href="https://github.com/romac/react-if/commits?author=ejbp" title="Code">💻</a></td>
    <td align="center"><a href="https://nirri.us/"><img src="https://avatars3.githubusercontent.com/u/592134?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Teffen Ellis</b></sub></a><br /><a href="#projectManagement-TeffenEllis" title="Project Management">📆</a> <a href="https://github.com/romac/react-if/commits?author=TeffenEllis" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Mamoru1234"><img src="https://avatars2.githubusercontent.com/u/11805198?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Alexei Gontar</b></sub></a><br /><a href="https://github.com/romac/react-if/commits?author=Mamoru1234" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/melyourhero"><img src="https://avatars3.githubusercontent.com/u/11873817?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Dmitry Melnik</b></sub></a><br /><a href="https://github.com/romac/react-if/commits?author=melyourhero" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/eropple"><img src="https://avatars2.githubusercontent.com/u/109262?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ed Ropple</b></sub></a><br /><a href="https://github.com/romac/react-if/commits?author=eropple" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/gradosevic"><img src="https://avatars2.githubusercontent.com/u/10562516?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Goran Radosevic</b></sub></a><br /><a href="https://github.com/romac/react-if/commits?author=gradosevic" title="Documentation">📖</a></td>
    <td align="center"><a href="https://haroen.me/"><img src="https://avatars3.githubusercontent.com/u/6270048?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Haroen Viaene</b></sub></a><br /><a href="https://github.com/romac/react-if/commits?author=Haroenv" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://www.martijnthe.nl/"><img src="https://avatars3.githubusercontent.com/u/193881?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Martijn Thé</b></sub></a><br /><a href="https://github.com/romac/react-if/commits?author=martijnthe" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/artcoding-git"><img src="https://avatars0.githubusercontent.com/u/20770507?v=4?s=100" width="100px;" alt=""/><br /><sub><b>artcoding-git</b></sub></a><br /><a href="https://github.com/romac/react-if/commits?author=artcoding-git" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/Ako520"><img src="https://avatars3.githubusercontent.com/u/22900569?v=4?s=100" width="100px;" alt=""/><br /><sub><b>王天博</b></sub></a><br /><a href="https://github.com/romac/react-if/issues?q=author%3AAko520" title="Bug reports">🐛</a> <a href="https://github.com/romac/react-if/commits?author=Ako520" title="Code">💻</a></td>
    <td align="center"><a href="https://arcath.net/"><img src="https://avatars1.githubusercontent.com/u/19609?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Adam Laycock</b></sub></a><br /><a href="https://github.com/romac/react-if/commits?author=Arcath" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
