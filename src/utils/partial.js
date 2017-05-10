import { map, filter } from '../functional/arrays';
export const __          = Symbol('empty parameter');
export const isPlaceholder      = a => a === __;
const notPlaceholder     = a => !(isPlaceholder(a));
const removePlaceholders = a => filter(notPlaceholder, a);

/**
 * Partial Application Utility
 * @example
 *   const myFunc = partial(otherFn, 10, __, 30, __, 50)
 *   myFunc(20)(40);  === otherFn(10, 20, 30, 40, 50)
 *
 * @param func
 * @param args
 * @returns {function}
 */
export default function partial(func, ...args) {
  const numReqArgs = func.length;

  return function _partial(...args2) {
    const filledIn  = map(c => isPlaceholder(c) && args2.length ?
      args2.shift() : c, args);

    const current   = [...filledIn, ...args2];
    const validArgs = removePlaceholders(current);

    if (validArgs.length >= numReqArgs) {
      return func(...validArgs);
    }
    return partial(func, ...current);
  }
}
