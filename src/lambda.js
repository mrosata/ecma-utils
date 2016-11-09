import curry from './curry.js'
import curry2 from './curry2.js'

/**  isArray :: Mixed -> Boolean */
const isArray = (mixed) => Array.isArray(mixed)
/** isCallable :: Mixed -> Boolean */
const isCallable = (mixed) => typeof mixed === "function"
/**  isArray :: Mixed -> Boolean */
const isObject = (mixed) => !!mixed && typeof mixed === "object"
/**  isDefined :: Mixed -> Boolean */
const isDefined = (mixed) => typeof mixed !== "undefined"
/**  isBool :: Mixed -> Boolean */
const isBool = (mixed) => typeof mixed !== "boolean"
/**  isBool :: Mixed -> Boolean */
const isNone = (mixed) => mixed === null
/**  not :: Mixed -> Boolean # tests if falsey */
const not = (val) => !val
/**  isNeg :: Mixed -> Boolean  # falsey and not zero */
const isNeg = (val) => !val && val !== 0
/**  noop :: Mixed -> Boolean */
const noop = (n) => void(n)
/**  bool :: Mixed -> Boolean */
const bool = (val) => !!val
/** int :: Mixed -> Integer */
const int = (val) => isNeg(val) ? 0 : +val
/** sum :: Number -> Number -> Number */
const sum = curry((a, b) => a + b )
/** list :: Mixed -> List  # create array from value or from another array */
const list = (mixed) => isArray(mixed) ? mixed.slice(0) : [].concat(mixed)
/**  keys :: Obj -> List */
const keys = obj => list(Object.keys(obj))
/** get :: Object, String -> Mixed */
const get = curry2((obj, key, def) => obj && obj.hasOwnProperty(key) ?
  obj[key] : def || noop(undefined))
/** at :: Obj, List -> List */
const at = (obj, propsList) => propsList.map(get(obj)).filter(isDefined)
/**  zip :: (List -> List) -> List */
const zip = (...arrayish) =>
  new Array(Math.max.apply(null, arrayish.map(a=>a.length)))
    .fill(noop(null))
    .map((_, index) => {

      return arrayish.reduce((accum, _array) => {
        var _item = _array && _array.length > index ? _array[index]: undefined;
        accum.push(_item);
        return accum;
      }, [])
    })

/**  unzip :: (List -> List) -> Mixed */
const unzipWith = (fn, arrayish) => arrayish
  .reduce((accum, items) => {
    accum.push(fn.apply(fn, items));
    return accum;
  }, [])
/** apply :: Fn, Mappable -> Mixed */
const apply = (fn, mappable) => fn.apply(fn, mappable)
/**  lastItem :: List -> Mixed */
const lastItem = (arrayish) => list(arrayish)[arrayish.length - 1]
/**  lastIndex :: List -> Int */
const lastIndex = (arrayish) => list(arrayish).length - 1
/**  head :: List -> Mixed */
const head = (arrayish) => list(arrayish)[0]
/** pluck :: (List -> Int) -> Mixed */
const pluck = curry((arrayish, idx) => list(arrayish)[idx])
/** pluckN :: (Int -> List) -> Mixed */
const pluckN = curry((idx, arrayish) => list(arrayish)[idx])
/** immutableSplice :: (List -> Integer) -> List */
const immutableSplice = idx => arrayish => list(arrayish).slice(0, idx)
  .concat(list(arrayish).slice(idx+1))
/**  count :: List -> Integer */
const count = (arrayish) => isArray(arrayish) && arrayish.length ?
  arrayish.length : 0
/**  push :: List, Mixed -> List  # unlike [].push, this returns the item (pointless to call list() here) */
const push = curry((arrayish, item) => arrayish.push(item) && item)
/**  map :: List -> Fn -> List */
const map = curry((fn, arrayish) => list(arrayish).map(fn))
/**  filter :: List -> Fn -> List */
const filter = fn => arrayish => list(arrayish).filter(fn)
/** reduce :: Fn -> List -> Mixed */
const reduce = curry2((fn, arrayish, def) => arrayish && arrayish.length ?
  list(arrayish).reduce(fn, def || noop()) : noop())
/** padList :: List, Int, Mixed -> List */
const padList = (arrayish, len, val) => list(arrayish).concat(
  new Array(Math.max(0, len - arrayish.length)).fill(val))
/**  tap :: id -> id  # console log values from within pipes or chains */
const tap = (id) => {console.log(id);return id;}
/**  lTap :: id -> id  # Add a label as a prefix to a tap() console output */
const lTap = (labelString) => (id) => {console.log(labelString, id);return id;}
/** minOf :: Num, Num -> Num */
const minOf = (min, num) => Math.max(min, num)
/** maxOf :: Num, Num -> Num */
const maxOf = (max, num) => Math.min(max, num)
/** inRange :: (Num -> Num -> Num) -> Num  # inclusive boundaries*/
const inRange = curry2((num, min, max) => maxOf(minOf(min, num), max))
/** divideBy :: (Number -> Number) -> Float */
const divideBy = curry((denom, numer) => numer / denom)
/** divide :: (Number -> Number) -> Float */
const divide = curry((numer, denom) => numer / denom)
/** match :: Str -> List  # note: this forces the global flag */
const match = curry((re, str) => {
  if (re.flags.indexOf('g') === -1) {
    re.compile(re.source, `${re.flags}g`);}
  return str.match(re);
})
/**  replaceAll */
const replaceAll = (text, re, replacement) => (text || '')
  .replace(re, replacement)
/** str :: Mixed -> String */
const str = (mixed) => isObject(mixed) && mixed.toString ?
  mixed.toString : ''.concat(mixed)
/** strMatchRE :: Str -> RegExp -> List */
const strMatchRE = curry((text, re) => text.match(re))
/** strMatchStr :: Str -> Str -> Bool */
const strMatchStr = curry(
  (textStr1, textStr2) => {
    return str(textStr1).length === str(textStr2).length &&
      textStr1.indexOf(textStr2) === 0
  })
/**  strToRegExp :: Str -> RegExp */
const strToRegExp = (str) => new RegExp(
  `\\b${replaceAll(str, /(\?|\*|\+|\.|\(|\)|\[\$|\^)/, '\\$1')}\\b`, 'gim')
/** ifOrElse :: Mixed, Success, Failure -> Success|Failure */
const ifOrElse = (condition, ifTrue, ifFalsey) => !!condition ?
  ifTrue : ifFalsey
/** orElse :: Mixed, Success, Failure -> Success|Failure */
const orElse = (primary, fallback) => primary || fallback
/** initializeToType :: (Type -> Mixed) -> Type  */
const initializeToType = (ConstructorFn) => (item) => {
  return item instanceof ConstructorFn ? item : new ConstructorFn()
}
/** compose :: ..Fns -> Mixed */
const compose = function(...fns) {
  return (catalyst) => {
    return fns.reduce((accum, fn) => {
      return fn.apply(null, accum);
    }, (catalyst || noop()));
  }
}
/**
 * Run an array of functions against an array of arguments where
 * function at funcs[0] is called with arguments at subjects[0]
 * @type {Function}
 */
const runWith = curry(function runWith(funcs, subjects) {
  subjects = padList(subjects, funcs.length, undefined);

  return list(funcs)
    .reduce((acc, func, index) => {
      acc.push(func(subjects[index]));
      return acc;
    }, []);
})


export default {
  isArray, isCallable, isObject, isDefined, isBool, isNone, not, isNeg,
  noop, bool, int, sum, list, keys, get, at, zip, unzipWith, apply, lastItem,
  lastIndex, head, pluck, pluckN, immutableSplice, count, push, map, filter,
  reduce, padList, tap, lTap, minOf, maxOf, inRange, divideBy, divide, match,
  replaceAll, str, strMatchRE, strMatchStr, strToRegExp, ifOrElse, orElse,
  initializeToType, compose, runWith
}