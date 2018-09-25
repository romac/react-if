
# Changelog

## 3.1.2 (2018-09-25)

- Add missing TypeScript declarations for When and Unless. (@martijnthe)

## 3.1.1 (2018-09-07)

- Fixed a bug of `<When/>` and `<Unless/>` components that was not allowing to show any children even if the condition was true. (@ejbp)

## 3.1.0 (2018-08-31)

- Updated babel to v7 (@meszaros-lajos-gyorgy)
- Fixed typos in the readme and cleaned up examples (@meszaros-lajos-gyorgy)

## 3.0.0 (2018-08-30)

- Added When and Unless shorthands (@meszaros-lajos-gyorgy)
- Changed propType for Then and Else to node (@meszaros-lajos-gyorgy)
- Fixed up test and updated some dependencies (@meszaros-lajos-gyorgy)

## 2.2.2

- Add TypeScript typings. (@TeffenEllis)

## 2.2.1

- Update to React 15.5 (@romac)

## 2.2.0

- Rewrite with functional components. (@timjacobi)

## 2.1.0 (2016-06-13)

- Render any child component apart from `Else` if condition is true. (@timjacobi)
- Added tests. (@timjacobi)
- Allow `If` to have no children.

## 2.0.5 (2015-01-20)

- Add missing import statement.

## 2.0.2 (2015-01-17)

- Fix isInstance method for React >= 0.14

## 2.0.0 (2015-01-17)

- Rewritten in ES2015.
- Allow empty branches, and make them optional.

## 1.2.0 (2015-01-17)

- Add support for lazy evaluation of `Then` and `Else` children. (@Rleahy22)

## 1.1.1 (2015-01-12)

- Use React.PropTypes.element instead of React.PropTypes.component, if available.

## 1.1.0 (2015-01-12)

- Use `this` instead of `window` to make it work with browserify.

## 1.0.1 (2014-09-04)

- Initial release

