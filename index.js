/** @jsx React.DOM */

(function(root, React) {

  'use strict';

  function _isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
  }

  var isArray = (Array.isArray != null) ? Array.isArray.bind(Array) : _isArray;

  var Then = React.createClass({
    displayName: 'Then',
    propTypes: {
      children: React.PropTypes.oneOfType([
        React.PropTypes.func,
        React.PropTypes.string,
        React.PropTypes.number,
        React.PropTypes.object
      ])
    },
    render: function() {
      if (typeof this.props.children === 'function') {
        return this.props.children();
      } else {
        return this.props.children || null;
      }
    }
  });

  Then.isInstance = function(obj) {
    return obj instanceof Then;
  };

  var Else = React.createClass({
    displayName: 'Else',
    propTypes: {
      children:  React.PropTypes.oneOfType([
        React.PropTypes.func,
        React.PropTypes.string,
        React.PropTypes.number,
        React.PropTypes.object
      ])
    },
    render: function() {
      if (typeof this.props.children === 'function') {
        return this.props.children();
      } else {
        return this.props.children || null;
      }
    }
  });

  Else.isInstance = function(obj) {
    return obj instanceof Else;
  };

  var PropTypes = React.PropTypes;
  var IfOrElse  = PropTypes.oneOfType([
    PropTypes.instanceOf(Then),
    PropTypes.instanceOf(Else)
  ]);

  var If = React.createClass({
    displayName: 'If',

    propTypes: {
      condition: PropTypes.bool.isRequired,
      children:
        PropTypes.oneOfType([
          PropTypes.arrayOf(IfOrElse),
          IfOrElse
        ]).isRequired
    },

    render: function() {
      if (this.props.condition) {
        return this.renderThen();
      }
      return this.renderElse();
    },

    renderThen: function() {
      return this.renderChildOfType(Then);
    },

    renderElse: function() {
      return this.renderChildOfType(Else);
    },

    renderChildOfType: function(Type) {
      if (this.props.children == null) {
        return null;
      }

      var childs = this.props.children;
      childs     = isArray(childs) ? childs : [childs];
      childs     = childs.filter(Type.isInstance);

      if (childs.length > 0) {
        return childs[0];
      }

      return null;
    }

  });

  If.Then = Then;
  If.Else = Else;

  if (typeof module === 'undefined') {
    root.ReactIf = If;
  } else {
    module.exports = If;
  }

})(this, typeof require === 'function' ? require('react') : this.React);

