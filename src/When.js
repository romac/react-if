import React from 'react'
import PropTypes from 'prop-types';

export function When(props) {
  const { condition, children } = props

  return condition && children ? children : null
}

When.propTypes = {
  condition: PropTypes.bool.isRequired,
  children: PropTypes.node
}

When.defaultProps = {
  children: null
}

export default When
