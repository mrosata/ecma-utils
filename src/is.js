/**
 * @class ecma-utils/is
 * @memberOf ecmaUtils
 * @method none
 * @method none
 * @method object
 * @method objectType
 * @method array
 * @method callable
 * @method undefined
 * @method defined
 * @method string
 * @method number
 * @method NaN
 * @method a
 * @method thenable
 * @method not
 * @method and
 * @method affirm
 * @method objectWith
 * @method truthy
 * @method falsey
 *
 * @desc JavaScript type validations, a utilities for testing values
 *       for type. Includes and, or, truthy and falsey checks as well.
 *     ```javascript
 *        if ( is.none(val) )       { "Value is null"              }
 *        if ( is.object(val) )     { "Value is a real object"     }
 *        if ( is.objectType(val) ) { "Value is a real object"     }
 *        if ( is.array(val) )      { "Value is an Array"          }
 *        if ( is.callable(val) )   { "Value is a Function"        }
 *        if ( is.defined(val) )    { "Value is not undefined"     }
 *        if ( is.undefined(val) )  { "Value is defined"           }
 *        if ( is.string(val) )     { "Value is a String"          }
 *        if ( is.number(val) )     { "Value is a number"          }
 *        if ( is.a(val, B) )       { "Value is of type B"         }
 *        if ( is.thenable(val) )   { "Value is has then function" }
 *        if ( is.not(...fns) )     { "Fn to test fails 1+ test"   }
 *        if ( is.and(...fns) )     { "Fn to test passes 1+ tests" }
 *        if ( is.affirm(fn) )      { "Fn to test passes 1 test"   }
 *        if ( is.objectWith(val) ) { "Fn to test object props"    }
 *        if ( is.truthy(val) )     { "Value coherses to false"    }
 *        if ( is.falsey(val) )     { "Value coherses to true"     }
 *     ```
 */


/**
 * The current executions global environment.
 *
 * @type {Window}
 */
const environment = (
  typeof self !== "undefined" ? self : (
    typeof window !== "undefined" ? window : (
      typeof global !== "undefined" ? global : {}
    )))


class is {

  static none(testValue) {
    return testValue === null
  }

  static object(testValue) {
    return is.objectType(testValue) && testValue.constructor !== Array
  }

  static objectType(testValue) {
    return !!testValue && typeof testValue === "object"
  }

  static array(testValue) {
    return Array.isArray(testValue)
  }

  static callable(testValue) {
    return typeof testValue === "function"
  }

  static undefined(testValue) {
    return typeof testValue === "undefined"
  }

  static defined(testValue) {
    return is.not( is.undefined(testValue) )
  }

  static string(testValue) {
    return typeof testValue === "string"
  }

  static number(testValue) {
    return typeof testValue === "number" && is.not( Number.isNaN(testValue) )
  }

  static NaN(testValue) {
    return Number.isNaN(testValue)
  }


  /**
   * Affirm whether an object or function points to a specific constructor.
   *
   * @param {object|function} testValue
   * @param {object|string} typeConstructor
   *     can test against values such as Array or "Array"
   * @returns {*|boolean}
   */
  static a(testValue, typeConstructor) {
    return (is.objectType(testValue) || is.callable(testValue)) && (
        is.string(typeConstructor) ?
        testValue.constructor === environment[typeConstructor] : (
          testValue.constructor === typeConstructor
        ))
  }


  /**
   * Affirm that a value has a "then" method.
   *
   * @param testValue
   * @returns {*}
   */
  static thenable(testValue) {
    return is.objectType(testValue) && is.callable(testValue.then)
  }


  /**
   * Create a function that will validate that a value does not
   * meet certain condition/s.
   *
   *     ```javascript
   *     const notObject = is.not( is.object )
   *     if (notObject( someValue )) {
   *         // ... do some work
   *     }
   *     ```
   *
   * @param testFunction
   * @returns {Function}
   */
  static not(...testFunction) {
    return (testValue) => !testFunction(...testValue)
  }


  /**
   * Create a function that will validate that a value does
   * meet certain condition/s.
   *
   *     ```javascript
   *     const isCompatibleAPI = is.and( is.object, (t) => is.callable(t.someMethod) )
   *     if ( isCompatibleAPI( someAPI ) ) {
   *         // ... work with compatible API
   *     }
   *     ```
   *
   * Create function that will test that all conditions are met
   *
   * @param testFunctions
   * @returns {Function}
   */
  static and(...testFunctions) {
    return (testValue) => testFunctions.every(fn => !!fn(testValue))
  }


  /**
   * The singular version of `is.and`
   *
   * @param testFunction
   */
  static affirm(testFunction) {
    return (testValue) => testFunction(testValue)
  }


  /**
   * Create a function that will validate if a passed value is both
   * an object and contains a set of properties on it.
   *
   * @param props  N string arguments, for each property that must be
   *               defined on the testValue later passed in.
   * @returns {function(*=)}
   */
  static objectWith(...props) {
    return (testValue) => {
      return is.object( testValue ) && props.every(
          prop => !is.undefined( testValue[prop] ))
    }
  }


  /**
   * Test that a value is truthy
   *
   * @param testValue
   * @returns {boolean}
   */
  static truthy (testValue) {
    return !!testValue
  }

  /**
   * Test that a value is falsey
   *
   * @param testValue
   * @returns {boolean}
   */
  static falsey (testValue) {
    return !testValue
  }

}


export default is
