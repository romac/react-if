import React from 'react'
import PropTypes from 'prop-types';

export function Unless(props) {
  const { condition, children } = props

  return !condition && children ? children : null
}

Unless.propTypes = {
  condition: PropTypes.bool.isRequired,
  children: PropTypes.node
}

Unless.defaultProps = {
  children: null
}

export default Unless
