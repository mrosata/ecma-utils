
/**
 * This is my recursive curry. It will continue to wrap every call to a
 * function until the partial application is complete. It's not a traditional
 * curry in the sense that the function may be applied to multiple arguments
 * at a time.
 * @param fn
 * @returns {Function} fn
 */
module.exports = function curry(fn) {
  return (...args) => {
    if (args.length < fn.length) {
      return curry(fn.bind(fn, ...args));
    }
    return fn.call(fn, ...args);
  }
}
