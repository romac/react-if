# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [4.0.1](https://github.com/romac/react-if/compare/v4.0.0...v4.0.1) (2020-10-21)


### ⚠ BREAKING CHANGES

* **readme:** As part of the rewrite, the global exports are gone.
Please use CommonJS or ESM style imports as specified in the README.

### Bug Fixes

* **readme:** update shields ([d975fd4](https://github.com/romac/react-if/commit/d975fd44b737caff913725905abe316a02097236))

## [4.0.0](https://github.com/romac/react-if/compare/v3.4.3...v4.0.0) (2020-10-21)


### ⚠ BREAKING CHANGES

* As part of the rewrite, the global exports are gone. Please use CommonJS or ESM
style imports as specified in the README.

### Features

* rewrite entire lib from scratch ([9f93221](https://github.com/romac/react-if/commit/9f93221999e23bc39db98575aa72e245935ccb6d)), closes [#55](https://github.com/romac/react-if/issues/55) [#57](https://github.com/romac/react-if/issues/57)

## 3.4.3 (2019-06-17)

- Consistent type determination. (@Mamoru1234)

## 3.4.2 (2019-06-17)

- Type definition for Switch, Case and Default. (@melyourhero)

## 3.4.1 (2019-05-03)

- TypeScript types fix: Allow functions that return booleans instead of just booleans, as per prop-types. (@eropple)

## 3.4.0 (2019-04-24)

- Add Switch/Case/Default statement (@cyrilchapon)

## 3.3.0 (2019-04-23)

- Add lazy condition evalutation (@cyrilchapon)

## 3.2.0 (2019-04-23)

- Remove lock files
- Render in a fragment (@davidrevoledo)

## 3.1.3 (2018-10-26)

- Fix compatibility issue with `react-hot-loader`. (@Ako520)

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
