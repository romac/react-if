
import React from 'react';
import PropTypes from 'prop-types';

function render(props) {
  if (typeof props.children === 'function') {
    return props.children();
  }

  if (Array.isArray(props.children) 
      || (props.children && props.children.type == undefined)) {
    return React.createElement(span, null, props.children);
  }

  return props.children || null;
}

export function Then(props) {
  return render(props);
}

export function Else(props) {
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

export function If(props) {
  const { children } = props;

  if (children == null) {
    return null;
  }

  return [].concat(children).find(c => c.type !== Else ^ !props.condition) || null;
}

const ThenOrElse = PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.instanceOf(Then),
  PropTypes.instanceOf(Else)
]);

If.propTypes = {
  condition: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(ThenOrElse),
    ThenOrElse
  ])
};

If.Then = Then;
If.Else = Else;

export default If;

