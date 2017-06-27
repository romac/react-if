(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes);
    global.ReactIf = mod.exports;
  }
})(this, function (exports, _react, _propTypes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Then = Then;
  exports.Else = Else;
  exports.If = If;

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function render(props) {
    if (typeof props.children === 'function') {
      return props.children();
    }

    return props.children || null;
  }

  function Then(props) {
    return render(props);
  }

  function Else(props) {
    return render(props);
  }

  Then.propTypes = Else.propTypes = {
    children: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.object])
  };

  function If(props) {
    var children = props.children;


    if (children == null) {
      return null;
    }

    return [].concat(children).find(function (c) {
      return c.type !== Else ^ !props.condition;
    }) || null;
  }

  var ThenOrElse = _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.instanceOf(Then), _propTypes2.default.instanceOf(Else)]);

  If.propTypes = {
    condition: _propTypes2.default.bool.isRequired,
    children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(ThenOrElse), ThenOrElse])
  };

  If.Then = Then;
  If.Else = Else;

  exports.default = If;
});