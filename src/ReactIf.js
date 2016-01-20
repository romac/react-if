
import React from 'react';

const _isArray = (arg) => Object.prototype.toString.call(arg) === '[object Array]';
const isArray  = Array.isArray || _isArray;

const makeBranch = (name) => {
  const Branch = React.createClass({
    displayName: name,

    propTypes: {
      children: React.PropTypes.oneOfType([
        React.PropTypes.func,
        React.PropTypes.string,
        React.PropTypes.number,
        React.PropTypes.object
      ])
    },

    render() {
      if (typeof this.props.children === 'function') {
        return this.props.children();
      } else {
        return this.props.children || null;
      }
    }

  });

  Branch.isInstance = (obj) => obj.type === Branch;

  return Branch;
}

export const Then = makeBranch('Then');
export const Else = makeBranch('Else');

const PropTypes = React.PropTypes;
const IfOrElse  = PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.instanceOf(Then),
  PropTypes.instanceOf(Else)
]);

export const If = React.createClass({

  propTypes: {
    condition: PropTypes.bool.isRequired,
    children:
      PropTypes.oneOfType([
        PropTypes.arrayOf(IfOrElse),
        IfOrElse
      ]).isRequired
  },

  render() {
    if (this.props.condition) {
      return this.renderChildOfType(Then);
    }

    return this.renderChildOfType(Else);
  },

  renderChildOfType(Type) {
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

export default If;

