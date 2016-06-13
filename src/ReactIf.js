import React from 'react';

const _isArray = (arg) => Object.prototype.toString.call(arg) === '[object Array]';
const isArray  = Array.isArray || _isArray;

const { PropTypes } = React;

function render(props){
  if (typeof props.children === 'function') {
    return props.children();
  } else {
    return props.children || null;
  }
}

export function Then(props){
  return render(props);
}

export function Else(props){
  return render(props);
}

Then.propTypes = Else.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ])
};

export function If(props){  
  let { children } = props;

  if (!children) return null;

  children = isArray(children) ? children : [children];
  return children.find(c => c.type !== Else ^ !props.condition) || null;
}

const IfOrElse = PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.instanceOf(Then),
  PropTypes.instanceOf(Else)
]);

If.propTypes = {
  condition: PropTypes.bool.isRequired,
  children:
    PropTypes.oneOfType([
      PropTypes.arrayOf(IfOrElse),
      IfOrElse
    ])
};

If.Then = Then;
If.Else = Else;

export default If;