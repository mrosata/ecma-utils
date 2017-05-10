
/**
 * This is my recursive curry. It will continue to wrap every call to a
 * function until the partial application is complete. It's not a traditional
 * curry in the sense that traditional curried function take one argument at
 * a time. This curry allows the curried function to bind multiple arguments
 * at once. This behaviour is
 * @param fn
 * @returns {Function} fn
 */
export default function curry(fn) {
  return (...args) => {
    if (args.length < fn.length) {
      return curry(fn.bind(fn, ...args));
    }
    return fn.call(fn, ...args);
  }
}
