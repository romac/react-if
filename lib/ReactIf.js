(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "prop-types"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("prop-types"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.propTypes);
    global.ReactIf = mod.exports;
  }
})(this, function (_exports, _propTypes) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Then = Then;
  _exports.Else = Else;
  _exports.If = If;
  _exports.Unless = Unless;
  _exports.When = When;
  _exports.default = void 0;
  _propTypes = _interopRequireDefault(_propTypes);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    children: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.node])
  };

  function If(_ref) {
    var condition = _ref.condition,
        children = _ref.children;

    if (children == null) {
      return null;
    }

    return [].concat(children).find(function (c) {
      return c.type !== Else ^ !condition;
    }) || null;
  }

  var ThenOrElse = _propTypes.default.oneOfType([_propTypes.default.instanceOf(Then), _propTypes.default.instanceOf(Else), _propTypes.default.node]);

  If.propTypes = {
    condition: _propTypes.default.bool.isRequired,
    children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(ThenOrElse), ThenOrElse])
  };

  function Unless(_ref2) {
    var condition = _ref2.condition,
        children = _ref2.children;
    return !condition && children ? render({
      condition: condition,
      children: children
    }) : null;
  }

  Unless.propTypes = {
    condition: _propTypes.default.bool.isRequired,
    children: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.node])
  };
  Unless.defaultProps = {
    children: null
  };

  function When(_ref3) {
    var condition = _ref3.condition,
        children = _ref3.children;
    return condition && children ? render({
      condition: condition,
      children: children
    }) : null;
  }

  When.propTypes = {
    condition: _propTypes.default.bool.isRequired,
    children: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.node])
  };
  When.defaultProps = {
    children: null
  };
  If.Then = Then;
  If.Else = Else;
  If.When = When;
  If.Unless = Unless;
  var _default = If;
  _exports.default = _default;
});