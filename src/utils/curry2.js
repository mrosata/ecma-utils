/**
 * A curry that applies a morphism once it has two or more
 * arguments. It doesn't matter what the original function
 * has for an arity
 *
 * @param {function} fn
 * @return {function}
 */
export default function curry2(fn) {
  return (...args) => {
    if (args.length < 2) {
      return fn.bind(fn, ...args);
    }
    return fn.call(fn, ...args);
  }
}
