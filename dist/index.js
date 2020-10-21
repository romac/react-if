
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-if.cjs.production.min.js')
} else {
  module.exports = require('./react-if.cjs.development.js')
}
