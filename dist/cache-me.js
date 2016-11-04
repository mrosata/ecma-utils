"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = cacheMe;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  @package: "ecma-utils/cache-me"
 *  @author: Michael Rosata
 *  @description: JavaScript method cache decorator.
 *
 *
 * Wrap specific methods of an object so that they will cache
 * their own results.
 *
 *     ```javascript
 *         // imaginary class with methods 'add', 'mult', 'concat'
 *         let myObj = new MyObject();
 *
 *         cacheMe(myObj, 'add', 'mult'); // cache methods on myObj
 *     ```
 *
 *
 * @param subject object - Object on which the `methods` exist.
 * @param methods N strings - one for each method to wrap
 * @returns {*}
 */

var validKey = function validKey(keyStr) {
  return encodeURIComponent(keyStr);
};
var noop = function noop() {
  return null;
};

var CachedObject = function () {
  function CachedObject(subject, methods) {
    _classCallCheck(this, CachedObject);

    this.subject = subject;
    this._cache = {};

    // If no methods were passed in then we should cache all methods.
    if (!methods || !methods.length) {
      methods = Object.keys(subject);
    }

    this.mapMethodsToCache(methods);
  }

  _createClass(CachedObject, [{
    key: "accessMethodCache",
    value: function accessMethodCache(methodName, method) {
      var _cache = this._cache;

      for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      var key = this.keyForArgs.apply(this, args);

      if (!_cache[methodName].hasOwnProperty(key)) {
        _cache[methodName][key] = method.apply(undefined, args);
      }

      return _cache[methodName][key];
    }

    /**
     * Decorate the methods
     * @param array methods
     *     An array of method names on this.subject to decorate
     */

  }, {
    key: "mapMethodsToCache",
    value: function mapMethodsToCache(methods) {
      var _this = this;

      var accessMethodCache = this.accessMethodCache,
          _cache = this._cache,
          subject = this.subject;


      var boundAccessCache = accessMethodCache.bind(this);
      methods.map(function (method) {
        // Make sure we only create the cache 1 time.
        if (!_cache[method]) {
          _cache[method] = {};
        }

        // If the method exists, overwrite it as a cached function.
        if (typeof subject[method] === "function") {
          _this.subject[method] = function (fn) {
            return function () {
              for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
              }

              return boundAccessCache.apply(undefined, [method, fn].concat(args));
            };
          }(subject[method]);
        }

        // Method is not a function, so it can't be wrapped by _cache.
        return subject[method];
      });
    }
  }]);

  return CachedObject;
}();

CachedObject.prototype.keyForArgs = function () {
  for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  return validKey(JSON.stringify(args));
};

function cacheMe(subject) {
  for (var _len4 = arguments.length, methods = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    methods[_key4 - 1] = arguments[_key4];
  }

  if (typeof subject === "function") {
    // Cache 1 function
    // TODO: Add in single function caching.
  }
  methods = methods || [];
  return new CachedObject(subject, methods);
}