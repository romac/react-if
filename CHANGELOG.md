# Changelog

All notable changes to this project will be documented in this file.

# [4.1.4](https://github.com/romac/react-if/compare/v4.1.3...v4.1.4) - (2022-04-21)

## Bug Fixes

- Issues with esm module (#184) ([402c1a6](https://github.com/romac/react-if/commit/402c1a689e33e7ed0c954ac94f996913e4973a7b))

# [4.1.3](https://github.com/romac/react-if/compare/v4.1.2...v4.1.3) - (2022-04-16)

## Bug Fixes

- Fixed prepublish script for yarn publish ([f6c8cdd](https://github.com/romac/react-if/commit/f6c8cdd06a09b2c4f0ffcad1711acf0f2d8dc0f9))

# [4.1.2](https://github.com/romac/react-if/compare/v4.1.1...v4.1.2) - (2022-04-15)

## Bug Fixes

- Export additional types for end-users ([61f9abf](https://github.com/romac/react-if/commit/61f9abfd1bd1e7f8904edfbdfadf8cd5aab30257))
- Properly fix types for React 18 ([54fee8e](https://github.com/romac/react-if/commit/54fee8e9d935609cebec6c36107cba01a24399f6))
- Update peer dependency to allow React 18 ([b10bd3f](https://github.com/romac/react-if/commit/b10bd3f34ead4fffe6044fc3ba7d5dc8c17a652f))
- Fixed the code to work with React 18 ([4d504e1](https://github.com/romac/react-if/commit/4d504e15b2234a2d2f498c82c863af11105b55d3))

## Refactor

- Cleanup generic type ([c8b566b](https://github.com/romac/react-if/commit/c8b566b4fa504ed6236a206b0c26c09627c545fe))
- Clean up global type declarations ([5477d9d](https://github.com/romac/react-if/commit/5477d9d2aeaf981dd784939fe6a307cd64e67d72))

## Styling

- Reformat renovate config file ([1c9509b](https://github.com/romac/react-if/commit/1c9509bc1a75cad8121e9e2f46c12a7bd0ec413e))
- Add EOF line for script ([eba5e71](https://github.com/romac/react-if/commit/eba5e71834771aa138fd815d721c16e7bbc21ae3))

## Testing

- Add more If tests ([6a91441](https://github.com/romac/react-if/commit/6a914413f0ffc34c356968cd91282950a6ded17f))
- Finish porting tests to testing-library ([e6c809a](https://github.com/romac/react-if/commit/e6c809a9a5a50027c35079ccac0dbb1ae0de0a18))
- Update switch test ([f229b1b](https://github.com/romac/react-if/commit/f229b1bf89fefb4ed7fdc4dce0f7e7569892e7cf))
- Rewrite tests to react-testing-library (part 1) ([196c536](https://github.com/romac/react-if/commit/196c53661ff56ed13d1a48131ed5671c5979cc1f))
- Configure jest runner vscode extension ([2642c49](https://github.com/romac/react-if/commit/2642c49e72184bdde77ca4bb10f0f3a578c5469e))

### [4.1.1](https://github.com/romac/react-if/compare/v4.1.0...v4.1.1) (2021-09-26)

### Bug Fixes

- **readme:** fixed headers for usage ([188f859](https://github.com/romac/react-if/commit/188f8595072a9d966503dd9577a966752c5aa250))

## [4.1.0](https://github.com/romac/react-if/compare/v4.0.1...v4.1.0) (2021-09-26)

### Features

- add `Fallback` component ([d949f89](https://github.com/romac/react-if/commit/d949f89ae4e50af23a1560118a222ad576c4af41))
- add `IfAsync` component (will be used automatically when passing a `Promise` to the `condition` of `<If condition={...}>`) ([c6ff69c](https://github.com/romac/react-if/commit/c6ff69c2a7ab732dcafa473e9449d9ce2bba150e))
- add promise support to `<If />` component (fixes [#53](https://github.com/romac/react-if/issues/53)) ([#111](https://github.com/romac/react-if/issues/111)) ([18bb83b](https://github.com/romac/react-if/commit/18bb83bf1c2effb7db5c2d8b98dc15ca19ba64b5))
- update soft minimum NodeJS requirement to v14 - only applies when `engines` is checked ([f1ede6f](https://github.com/romac/react-if/commit/f1ede6fb9cc898ef22a00be7be1791fc53d90730))

### Bug Fixes

- **if:** properly throw warnings in dev mode ([bd80bbc](https://github.com/romac/react-if/commit/bd80bbc035ab8d9aec7345d5333d6e1caefd6d3d))

### [4.0.1](https://github.com/romac/react-if/compare/v4.0.0...v4.0.1) (2020-10-21)

### ⚠ BREAKING CHANGES

- **readme:** As part of the rewrite, the global exports are gone.
  Please use CommonJS or ESM style imports as specified in the README.

### Bug Fixes

- **readme:** update shields ([d975fd4](https://github.com/romac/react-if/commit/d975fd44b737caff913725905abe316a02097236))

## [4.0.0](https://github.com/romac/react-if/compare/v3.4.3...v4.0.0) (2020-10-21)

### ⚠ BREAKING CHANGES

- As part of the rewrite, the global exports are gone. Please use CommonJS or ESM
  style imports as specified in the README.

### Features

- rewrite entire lib from scratch ([9f93221](https://github.com/romac/react-if/commit/9f93221999e23bc39db98575aa72e245935ccb6d)), closes [#55](https://github.com/romac/react-if/issues/55) [#57](https://github.com/romac/react-if/issues/57)

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
