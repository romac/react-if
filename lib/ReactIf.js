(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "prop-types", "react"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("prop-types"), require("react"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.propTypes, global.react);
    global.ReactIf = mod.exports;
  }
})(this, function (_exports, _propTypes, _react) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Then = Then;
  _exports.Else = Else;
  _exports.If = If;
  _exports.Unless = Unless;
  _exports.When = When;
  _exports.Case = Case;
  _exports.Default = Default;
  _exports.Switch = Switch;
  _exports["default"] = void 0;
  _propTypes = _interopRequireDefault(_propTypes);
  _react = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  function render(props) {
    if (typeof props.children === "function") {
      return _react["default"].createElement(_react["default"].Fragment, null, props.children());
    }

    return _react["default"].createElement(_react["default"].Fragment, null, props.children || null);
  }

  function getConditionResult(condition) {
    var conditionResult = !!(typeof condition === 'function' ? condition() : condition);
    return conditionResult;
  }

  function Then(props) {
    return render(props);
  }

  function Else(props) {
    return render(props);
  }

  Then.propTypes = Else.propTypes = {
    children: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].node])
  };

  function If(_ref) {
    var condition = _ref.condition,
        children = _ref.children;

    if (children == null) {
      return null;
    }

    var conditionResult = getConditionResult(condition);
    return _react["default"].createElement(_react["default"].Fragment, null, [].concat(children).find(function (c) {
      return c.type !== _react["default"].createElement(Else, null).type ^ !conditionResult;
    }) || null);
  }

  var ThenOrElse = _propTypes["default"].oneOfType([_propTypes["default"].instanceOf(Then), _propTypes["default"].instanceOf(Else), _propTypes["default"].node]);

  If.propTypes = {
    condition: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].bool]).isRequired,
    children: _propTypes["default"].oneOfType([_propTypes["default"].arrayOf(ThenOrElse), ThenOrElse])
  };

  function Unless(_ref2) {
    var condition = _ref2.condition,
        children = _ref2.children;
    var conditionResult = !!getConditionResult(condition);
    return !conditionResult && children ? render({
      condition: condition,
      children: children
    }) : null;
  }

  Unless.propTypes = {
    condition: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].bool]).isRequired,
    children: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].node])
  };
  Unless.defaultProps = {
    children: null
  };

  function When(_ref3) {
    var condition = _ref3.condition,
        children = _ref3.children;
    var conditionResult = getConditionResult(condition);
    return conditionResult && children ? render({
      condition: condition,
      children: children
    }) : null;
  }

  When.propTypes = {
    condition: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].bool]).isRequired,
    children: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].node])
  };
  When.defaultProps = {
    children: null
  };

  function Case(props) {
    return render(props);
  }

  Case.propTypes = {
    condition: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].bool]).isRequired,
    children: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].node])
  };
  Case.defaultProps = {
    children: null
  };

  function Default(props) {
    return render(props);
  }

  Default.propTypes = {
    children: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].node])
  };
  Default.defaultProps = {
    children: null
  };

  function Switch(_ref4) {
    var children = _ref4.children;
    // -- Inspired from react-router --
    // We use React.Children.forEach instead of React.Children.toArray().find()
    // here because toArray adds keys to all child elements and we do not want
    // to trigger an unmount/remount for two children <Case>s or <Default>s
    var matchingCase;
    var defaultCase;

    _react["default"].Children.forEach(children, function (child) {
      // not a valid react child, don't add it
      if (!_react["default"].isValidElement(child)) {
        return;
      }

      if (!matchingCase && child.type === Case) {
        var condition = child.props.condition;
        var conditionResult = getConditionResult(condition);

        if (conditionResult) {
          matchingCase = child;
        } // else not matching condition, don't add it

      } else if (!defaultCase && child.type === Default) {
        defaultCase = child;
      } // else unknown type, don't add it

    });

    return matchingCase || defaultCase || null;
  }

  var CaseOrDefault = _propTypes["default"].oneOfType([_propTypes["default"].instanceOf(Case), _propTypes["default"].instanceOf(Default), _propTypes["default"].node]);

  Switch.propTypes = {
    children: _propTypes["default"].oneOfType([_propTypes["default"].arrayOf(CaseOrDefault), CaseOrDefault])
  };
  Switch.defaultProps = {
    children: null
  };
  If.Then = Then;
  If.Else = Else;
  If.When = When;
  If.Unless = Unless;
  If.Switch = Switch;
  If.Case = Case;
  If.Default = Default;
  var _default = If;
  _exports["default"] = _default;
});