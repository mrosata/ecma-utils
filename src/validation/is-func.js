import is from "./is.js";
/**
 * @memberOf ecmaUtils
 *
 * @see is
 * @desc JavaScript type validations. The functional counterpart to
 *       the is class utilities.
 */


// isArray :: α -> Boolean
const isArray = is.array

// isObject :: α -> Boolean
const isObject = is.object

// isString :: α -> Boolean
const isString = is.string

// isNumber :: α -> Boolean
const isNumber = is.number

// isBool :: α -> Boolean
const isBool = is.bool

// isNone :: α -> Boolean
const isNone = is.none

// isDefined :: α -> Boolean
const isDefined = is.defined

// isCallable :: α -> Boolean
const isCallable = is.callable

// isNeg :: α -> Boolean
const isNeg = (val) => !val && val !== 0

// neg :: α -> Boolean
const neg = (val) => !val


export default {
  isArray, isObject, isString, isNumber,
  isBool, isNone, isDefined, isCallable,
  isNeg, neg,
}
