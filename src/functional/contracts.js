/*
 * Primitive type contracts, I haven't decided if
 * these functions will stay or go.
 */

/**  noop :: α -> Void  */
const noop = (n) => void(n)
/**  bool :: α -> Boolean  */
const bool = (val) => !!val

export { noop, bool }
