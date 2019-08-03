(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@babel/runtime/regenerator", "@babel/runtime/helpers/classCallCheck", "@babel/runtime/helpers/createClass", "@babel/runtime/helpers/possibleConstructorReturn", "@babel/runtime/helpers/getPrototypeOf", "@babel/runtime/helpers/inherits", "@babel/runtime/helpers/asyncToGenerator", "prop-types", "react"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@babel/runtime/regenerator"), require("@babel/runtime/helpers/classCallCheck"), require("@babel/runtime/helpers/createClass"), require("@babel/runtime/helpers/possibleConstructorReturn"), require("@babel/runtime/helpers/getPrototypeOf"), require("@babel/runtime/helpers/inherits"), require("@babel/runtime/helpers/asyncToGenerator"), require("prop-types"), require("react"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.regenerator, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.getPrototypeOf, global.inherits, global.asyncToGenerator, global.propTypes, global.react);
    global.ReactIf = mod.exports;
  }
})(this, function (_exports, _regenerator, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _getPrototypeOf2, _inherits2, _asyncToGenerator2, _propTypes, _react) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Then = Then;
  _exports.Else = Else;
  _exports.Unless = Unless;
  _exports.When = When;
  _exports.Case = Case;
  _exports.Default = Default;
  _exports.Switch = Switch;
  _exports["default"] = _exports.If = void 0;
  _regenerator = _interopRequireDefault(_regenerator);
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf2);
  _inherits2 = _interopRequireDefault(_inherits2);
  _asyncToGenerator2 = _interopRequireDefault(_asyncToGenerator2);
  _propTypes = _interopRequireDefault(_propTypes);
  _react = _interopRequireDefault(_react);

  function render(_ref) {
    var children = _ref.children,
        data = _ref.data;

    if (typeof children === "function") {
      return _react["default"].createElement(_react["default"].Fragment, null, children(data));
    }

    return _react["default"].createElement(_react["default"].Fragment, null, children || null);
  }

  function getConditionResult(_x) {
    return _getConditionResult.apply(this, arguments);
  }

  function _getConditionResult() {
    _getConditionResult = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(condition) {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(typeof condition === 'function')) {
                _context2.next = 4;
                break;
              }

              _context2.t0 = condition();
              _context2.next = 7;
              break;

            case 4:
              _context2.next = 6;
              return condition;

            case 6:
              _context2.t0 = _context2.sent;

            case 7:
              return _context2.abrupt("return", _context2.t0);

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return _getConditionResult.apply(this, arguments);
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

  var ThenOrElse = _propTypes["default"].oneOfType([_propTypes["default"].instanceOf(Then), _propTypes["default"].instanceOf(Else), _propTypes["default"].node]);

  var If =
  /*#__PURE__*/
  function (_React$Component) {
    (0, _inherits2["default"])(If, _React$Component);

    function If(props) {
      var _this;

      (0, _classCallCheck2["default"])(this, If);
      _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(If).call(this, props));
      _this.state = {
        conditionResult: false
      };
      return _this;
    }

    (0, _createClass2["default"])(If, [{
      key: "componentDidMount",
      value: function () {
        var _componentDidMount = (0, _asyncToGenerator2["default"])(
        /*#__PURE__*/
        _regenerator["default"].mark(function _callee() {
          var conditionResult;
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return getConditionResult(this.props.condition);

                case 3:
                  conditionResult = _context.sent;
                  this.setState({
                    conditionResult: conditionResult
                  });
                  _context.next = 10;
                  break;

                case 7:
                  _context.prev = 7;
                  _context.t0 = _context["catch"](0);
                  console.warn('react-if: the async condition was rejected', _context.t0);

                case 10:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[0, 7]]);
        }));

        function componentDidMount() {
          return _componentDidMount.apply(this, arguments);
        }

        return componentDidMount;
      }()
    }, {
      key: "render",
      value: function render() {
        var conditionResult = this.state.conditionResult;
        var children = this.props.children;
        return _react["default"].Children.map(children, function (child) {
          if (child.type !== Else ^ !conditionResult) {
            return _react["default"].cloneElement(child, {
              data: conditionResult
            });
          }

          return null;
        });
      }
    }]);
    return If;
  }(_react["default"].Component);

  _exports.If = If;
  If.propTypes = {
    condition: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].bool, _propTypes["default"].instanceOf(Promise)]).isRequired,
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
    var conditionResult = !!getConditionResult(condition);
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