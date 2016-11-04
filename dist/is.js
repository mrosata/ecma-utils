"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  @package: "ecma-utils/is"
 *  @author: Michael Rosata
 *  @description: JavaScript type validation class.
 *
 *
 * Utilities for testing values for type
 *     ```javascript
 *        if ( is.none(val) )       { "Value is null"              }
 *        if ( is.object(val) )     { "Value is a real object"     }
 *        if ( is.objectType(val) ) { "Value is a real object"     }
 *        if ( is.array(val) )      { "Value is an Array"          }
 *        if ( is.callable(val) )   { "Value is a Function"        }
 *        if ( is.defined(val) )    { "Value is not undefined"     }
 *        if ( is.undefined(val) )  { "Value is defined"           }
 *        if ( is.string(val) )     { "Value is a String"          }
 *        if ( is.stringLike(val) ) { "Value is str or str object" }
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
 * @type {Window|Global|Self}
 */
var environment = typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : undefined;

var is = function () {
  function is() {
    _classCallCheck(this, is);
  }

  _createClass(is, null, [{
    key: "none",
    value: function none(testValue) {
      return !testValue && (typeof testValue === "undefined" ? "undefined" : _typeof(testValue)) === "object";
    }
  }, {
    key: "object",
    value: function object(testValue) {
      return is.objectType(testValue) && testValue.constructor !== Array;
    }
  }, {
    key: "objectType",
    value: function objectType(testValue) {
      return testValue && (typeof testValue === "undefined" ? "undefined" : _typeof(testValue)) === "object";
    }
  }, {
    key: "array",
    value: function array(testValue) {
      return is.objectType(testValue) && testValue.constructor === Array;
    }
  }, {
    key: "callable",
    value: function callable(testValue) {
      return typeof testValue === "function";
    }
  }, {
    key: "undefined",
    value: function undefined(testValue) {
      return typeof testValue === "undefined";
    }
  }, {
    key: "defined",
    value: function defined(testValue) {
      return is.not(is.undefined(testValue));
    }
  }, {
    key: "string",
    value: function string(testValue) {
      return typeof testValue === "string";
    }
  }, {
    key: "stringLike",
    value: function stringLike(testValue) {
      return is.string || is.objectType(testValue) && typeof testValue.valueOf() === "string";
    }
  }, {
    key: "number",
    value: function number(testValue) {
      return typeof testValue === "number" && is.not(Number.isNaN(testValue));
    }
  }, {
    key: "NaN",
    value: function NaN(testValue) {
      return Number.isNaN(testValue);
    }

    /**
     * Affirm whether an object or function points to a specific constructor.
     *
     * @param {object|function} testValue
     * @param {object|string} typeConstructor
     *     can test against values such as Array or "Array"
     * @returns {*|boolean}
     */

  }, {
    key: "a",
    value: function a(testValue, typeConstructor) {
      return (is.objectType(testValue) || is.callable(testValue)) && (is.string(typeConstructor) ? testValue.constructor === environment[typeConstructor] : testValue.constructor === typeConstructor);
    }

    /**
     * Affirm that a value has a "then" method.
     *
     * @param testValue
     * @returns {*}
     */

  }, {
    key: "thenable",
    value: function thenable(testValue) {
      return is.objectType(testValue) && is.callable(testValue.then);
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

  }, {
    key: "not",
    value: function not() {
      for (var _len = arguments.length, testFunction = Array(_len), _key = 0; _key < _len; _key++) {
        testFunction[_key] = arguments[_key];
      }

      return function (testValue) {
        return !testFunction.apply(undefined, _toConsumableArray(testValue));
      };
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

  }, {
    key: "and",
    value: function and() {
      for (var _len2 = arguments.length, testFunctions = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        testFunctions[_key2] = arguments[_key2];
      }

      return function (testValue) {
        return testFunctions.every(function (fn) {
          return !!fn(testValue);
        });
      };
    }

    /**
     * The singular version of `is.and`
     *
     * @param testFunction
     */

  }, {
    key: "affirm",
    value: function affirm(testFunction) {
      return function (testValue) {
        return testFunction(testValue);
      };
    }

    /**
     * Create a function that will validate if a passed value is both
     * an object and contains a set of properties on it.
     *
     * @param props  N string arguments, for each property that must be
     *               defined on the testValue later passed in.
     * @returns {function(*=)}
     */

  }, {
    key: "objectWith",
    value: function objectWith() {
      for (var _len3 = arguments.length, props = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        props[_key3] = arguments[_key3];
      }

      return function (testValue) {
        return is.object(testValue) && props.every(function (prop) {
          return !is.undefined(testValue[prop]);
        });
      };
    }

    /**
     * Test that a value is truthy
     *
     * @param testValue
     * @returns {boolean}
     */

  }, {
    key: "truthy",
    value: function truthy(testValue) {
      return !!testValue;
    }

    /**
     * Test that a value is falsey
     *
     * @param testValue
     * @returns {boolean}
     */

  }, {
    key: "falsey",
    value: function falsey(testValue) {
      return !testValue;
    }
  }]);

  return is;
}();

exports.default = is;