module.exports = function () {
  process.env.NODE_PATH = 'src'
  process.env.BABEL_ENV = 'test'
  return {
    files: ['src/**/*.js*', '!dist/**.*', '!lib/**.*'],

    tests: ['test/**/*-tests.js'],

    env: {
      type: 'node',
      runner: 'node',
    },

    testFramework: 'mocha',
  };
};
