const pkg = require('./package.json')
const external = Object.keys(pkg.dependencies || {})

export default {
  input: 'lib/index.js',
  output: {
    file: pkg.main,
    format: 'cjs'
  },
  external
}
