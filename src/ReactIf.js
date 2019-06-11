import PropTypes from "prop-types";
import React from "react";

function render(props) {
  if (typeof props.children === "function") {
    return <React.Fragment>{props.children()}</React.Fragment>;
  }

  return <React.Fragment>{props.children || null}</React.Fragment>;
}

function getConditionResult(condition) {
  const conditionResult = !!((typeof condition === 'function')
    ? condition()
    : condition
  )

  return conditionResult
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

  const conditionResult = getConditionResult(condition)

  return (
    <React.Fragment>
      {[].concat(children).find(c => (c.type !== Else) ^ !conditionResult) ||
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
  const conditionResult = !!getConditionResult(condition)

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
  const conditionResult = getConditionResult(condition)

  return conditionResult && children ? render({ condition, children }) : null;
}

When.propTypes = {
  condition: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]).isRequired,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
};

When.defaultProps = {
  children: null
};

export function Case(props) {
  return render(props);
}

Case.propTypes = {
  condition: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]).isRequired,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
};

Case.defaultProps = {
  children: null
};

export function Default(props) {
  return render(props);
}

Default.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
};

Default.defaultProps = {
  children: null
};

export function Switch({ children }) {
  // -- Inspired from react-router --

  // We use React.Children.forEach instead of React.Children.toArray().find()
  // here because toArray adds keys to all child elements and we do not want
  // to trigger an unmount/remount for two children <Case>s or <Default>s
  let matchingCase;
  let defaultCase;

  React.Children.forEach(children, child => {
    // not a valid react child, don't add it
    if (!React.isValidElement(child)) {
      return
    }

    if (
      !matchingCase &&
      child.type === Case
    ) {
      const condition = child.props.condition

      const conditionResult = getConditionResult(condition)

      if (conditionResult) {
        matchingCase = child
      } // else not matching condition, don't add it
    } else if (
      !defaultCase &&
      child.type === Default
    ) {
      defaultCase = child
    }// else unknown type, don't add it
  });

  return matchingCase || defaultCase || null
}

const CaseOrDefault = PropTypes.oneOfType([
  PropTypes.instanceOf(Case),
  PropTypes.instanceOf(Default),
  PropTypes.node
]);

Switch.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(CaseOrDefault), CaseOrDefault])
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

export default If;
