import PropTypes from "prop-types";
import React from "react";

function render(props) {
  if (typeof props.children === "function") {
    return <React.Fragment>{props.children()}</React.Fragment>;
  }

  return <React.Fragment>{props.children || null}</React.Fragment>;
}

export function Then(props) {
  return render(props);
}

export function Else(props) {
  return render(props);
}

Then.propTypes = Else.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
};

export function If({ condition, children }) {
  if (children == null) {
    return null;
  }

  const conditionResult = (typeof condition === 'function')
    ? condition()
    : condition

  return (
    <React.Fragment>
      {[].concat(children).find(c => (c.type !== <Else />.type) ^ !conditionResult) ||
        null}
    </React.Fragment>
  );
}

const ThenOrElse = PropTypes.oneOfType([
  PropTypes.instanceOf(Then),
  PropTypes.instanceOf(Else),
  PropTypes.node
]);

If.propTypes = {
  condition: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]).isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(ThenOrElse), ThenOrElse])
};

export function Unless({ condition, children }) {
  const conditionResult = (typeof condition === 'function')
    ? condition()
    : condition

  return !conditionResult && children ? render({ condition, children }) : null;
}

Unless.propTypes = {
  condition: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]).isRequired,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
};

Unless.defaultProps = {
  children: null
};

export function When({ condition, children }) {
  const conditionResult = (typeof condition === 'function')
    ? !!condition()
    : condition

  return conditionResult && children ? render({ condition, children }) : null;
}

When.propTypes = {
  condition: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]).isRequired,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
};

When.defaultProps = {
  children: null
};

If.Then = Then;
If.Else = Else;
If.When = When;
If.Unless = Unless;

export default If;
