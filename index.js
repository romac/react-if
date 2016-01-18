/** @jsx React.DOM */

(function(root, React) {

  'use strict';

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
        return this.props.children;
      }
    }
  });

  Then.isInstance = function(obj) {
    return obj.type === Then;
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
        return this.props.children;
      }
    }
  });

  Else.isInstance = function(obj) {
    return obj.type === Else;
  };

  var PropTypes = React.PropTypes;

  var If = React.createClass({

    displayName: 'If',

    propTypes: {
      condition: PropTypes.bool.isRequired,
      children: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.instanceOf(Then),
        PropTypes.instanceOf(Else)
      ])).isRequired
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
      var childs = this.props.children.filter(Type.isInstance);

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

