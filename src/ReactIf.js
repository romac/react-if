
import React from 'react';
import PropTypes from 'prop-types';

const render = ({ children }) => {
  if (typeof children === 'function')
    return children();

  return children || null;
}

export const Then = (props) => {
  return render(props);
}

export const Else = (props) => {
  return render(props);
}

Then.propTypes = Else.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.object
  ])
};

const If = ({ children }) => {
  if (children == null)
    return null;

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

