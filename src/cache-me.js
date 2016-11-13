/**
 *  @package: "ecma-utils/cache-me"
 *  @author: Michael Rosata
 *  @description: JavaScript method cache decorator.
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
 */
const validKey = (keyStr) => encodeURIComponent(keyStr);


class CachedObject {
  /**
   * @param subject object - Object on which the `methods` exist.
   * @param methods N strings - one for each method to wrap
   * @returns {*}
   */
  constructor( subject, methods ) {
    this.subject = subject
    this._cache = {}


    // If no methods were passed in then we should cache all methods.
    if (!methods || !methods.length) {
      methods = Object.keys(subject);
    }

    this.mapMethodsToCache(methods)
  }

  accessMethodCache(methodName, method, ...args) {
    const {_cache} = this,
      key = this.keyForArgs( ...args )

    if (!_cache[methodName].hasOwnProperty(key)) {
      _cache[methodName][key] = method(...args);
    }

    return _cache[methodName][key];
  }


  /**
   * Decorate the methods
   * @param methods {[]}
   *     An array of method names on this.subject to decorate
   */
  mapMethodsToCache(methods) {
    const {subject} = this,
      boundAccessCache = this.accessMethodCache.bind(this)

    methods.map(method => {
      // Make sure we only create the cache 1 time.
      if (!this._cache[method]) {
        this._cache[method] = {}
      }

      // If the method exists, overwrite it as a cached function.
      if (typeof subject[method] === "function") {
        this.subject[method] = ((fn) => {
          return (...args) => {
            return boundAccessCache(method, fn, ...args);
          }
        })(subject[method]);
      }

      // Method is not a function, so it can't be wrapped by _cache.
      return subject[method];
    });
  }

}

CachedObject.prototype.keyForArgs = function (...args) {
  return validKey( JSON.stringify(args) )
}


export default function cacheMe (subject, ...methods) {
  if (typeof subject === "function") {
    // Cache 1 function
    // TODO: Add in single function caching.
  }
  methods = methods || []
  return new CachedObject(subject, methods)
}
