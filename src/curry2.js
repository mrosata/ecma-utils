/**
 * A curry that applies the function over the arguments as soon as the 
 * curried function is applied with at least 2 arguments. So the function 
 * can be applied to more than 2 arguments, they just have to be passed in
 * all at once.
 */
export default function curry2(fn) {
  return (...args) => {
    if (args.length < 2) {
      return fn.bind(fn, ...args);
    }
    return fn.call(fn, ...args);
  }
}
