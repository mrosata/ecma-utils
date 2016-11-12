import {is, curry, curry2, log} from './index.js'

/**  isArray :: Mixed -> Boolean */
export const isArray = (mixed) => is.array(mixed)
/** isCallable :: Mixed -> Boolean */
export const isCallable = (mixed) => typeof mixed === "function"
/**  isArray :: Mixed -> Boolean */
export const isObject = (mixed) => !!mixed && typeof mixed === "object"
/**  isDefined :: Mixed -> Boolean */
export const isDefined = (mixed) => typeof mixed !== "undefined"
/**  isBool :: Mixed -> Boolean */
export const isBool = (mixed) => typeof mixed !== "boolean"
/**  isBool :: Mixed -> Boolean */
export const isNone = (mixed) => mixed === null
/**  not :: Mixed -> Boolean # tests if falsey */
export const not = (val) => !val
/**  isNeg :: Mixed -> Boolean  # falsey and not zero */
export const isNeg = (val) => !val && val !== 0
/**  noop :: Mixed -> Boolean */
export const noop = (n) => void(n)
/**  bool :: Mixed -> Boolean */
export const bool = (val) => !!val
/** int :: Mixed -> Integer */
export const int = (val) => isNeg(val) ? 0 : +val
/** sum :: Number -> Number -> Number */
export const sum = curry((a, b) => a + b )
/** list :: Mixed -> List  # create array from value or from another array */
export const list = (mixed) => isArray(mixed) ?
  mixed.slice(0) : [].concat(mixed)
/**  keys :: Obj -> List */
export const keys = obj => list(Object.keys(obj))
/** set :: Object, Prop, String -> Object */
export const set = (obj, key, val) => Object.freeze(
  Object.assign({}, obj, {[key]: val}))
/** get :: Object, String -> Mixed */
export const get = curry2((obj, key, def) => obj && obj.hasOwnProperty(key) ?
  obj[key] : def || noop(undefined))
/** at :: Obj, List -> List */
export const at = (obj, propsList) => propsList.map(get(obj)).filter(isDefined)
/**  zip :: (List -> List) -> List */
export const zip = (...array) =>
  new Array(Math.max.apply(null, array.map(a=>a.length)))
    .fill(noop(null))
    .map((_, index) => {

      return array.reduce((accum, _array) => {
        var _item = _array && _array.length > index ? _array[index]: undefined;
        accum.push(_item);
        return accum;
      }, [])
    })

/**  unzip :: (List -> List) -> Mixed */
export const unzipWith = (fn, array) => array
  .reduce((accum, items) => {
    accum.push(fn.apply(fn, items));
    return accum;
  }, [])
/** apply :: Fn, Mappable -> Mixed */
export const apply = (fn, mappable) => fn.apply(fn, mappable)
/**  lastItem :: List -> Mixed */
export const lastItem = (array) => list(array)[array.length - 1]
/**  lastIndex :: List -> Int */
export const lastIndex = (array) => list(array).length - 1
/**  head :: List -> Mixed */
export const head = (array) => list(array)[0]
/** pluck :: (List -> Int) -> Mixed */
export const pluck = curry((array, idx) => list(array)[idx])
/** pluckN :: (Int -> List) -> Mixed */
export const pluckN = curry((idx, array) => list(array)[idx])
/** immutableSplice :: (List -> Integer) -> List */
export const immutableSplice = idx => array => list(array).slice(0, idx)
  .concat(list(array).slice(idx+1))
/**  count :: List -> Integer */
export const count = (array) => isArray(array) && array.length ?
  array.length : 0
/**  push :: List, Mixed -> List  # unlike [].push, this returns the item (pointless to call list() here) */
export const push = curry((array, item) => array.push(item) && item)
/**  map :: List -> Fn -> List */
export const map = curry((fn, array) => list(array).map(fn))
/**  filter :: List -> Fn -> List */
export const filter = fn => array => list(array).filter(fn)
/** reduce :: Fn -> List -> Mixed */
export const reduce = curry2((fn, array, def) => array.length ?
  list(array).reduce(fn, def || noop()) : noop())
/** padList :: List, Int, Mixed -> List */
export const padList = (array, len, val) => list(array).concat(
  new Array(Math.max(0, len - array.length)).fill(val))
/**  tap :: id -> id  # console log values from within pipes or chains */
export const tap = (id) => {console.log(id);return id;}
/**  lTap :: id -> id  # Add a label as a prefix to a tap() console output */
export const lTap = (label) => (id) => {log(label, id);return id;}
/** minOf :: Num, Num -> Num */
export const minOf = (min, num) => Math.max(min, num)
/** maxOf :: Num, Num -> Num */
export const maxOf = (max, num) => Math.min(max, num)
/** inRange :: (Num -> Num -> Num) -> Num  # inclusive boundaries*/
export const inRange = curry2((num, min, max) => maxOf(minOf(min, num), max))
/** divideBy :: (Number -> Number) -> Float */
export const divideBy = curry((denom, numer) => numer / denom)
/** divide :: (Number -> Number) -> Float */
export const divide = curry((numer, denom) => numer / denom)
/** match :: Str -> List  # note: this forces the global flag */
export const match = curry((re, str) => {
  if (re.flags.indexOf('g') === -1) {
    re.compile(re.source, `${re.flags}g`);}
  return str.match(re);
})
/**  replaceAll */
export const replaceAll = (text, re, replacement) => (text || '')
  .replace(re, replacement)
/** str :: Mixed -> String */
export const str = (mixed) => isObject(mixed) && mixed.toString ?
  mixed.toString : ''.concat(mixed)
/** strMatchRE :: Str -> RegExp -> List */
export const strMatchRE = curry((text, re) => text.match(re))
/** strMatchStr :: Str -> Str -> Bool */
export const strMatchStr = curry(
  (textStr1, textStr2) => {
    return str(textStr1).length === str(textStr2).length &&
      textStr1.indexOf(textStr2) === 0
  })
/**  strToRegExp :: Str -> RegExp */
export const strToRegExp = (str) => new RegExp(
  `\\b${replaceAll(str, /(\?|\*|\+|\.|\(|\)|\[\$|\^)/, '\\$1')}\\b`, 'gim')
/** ifOrElse :: Mixed, Success, Failure -> Success|Failure */
export const ifOrElse = (condition, ifTrue, ifFalsey) => !!condition ?
  ifTrue : ifFalsey
/** orElse :: Mixed, Success, Failure -> Success|Failure */
export const orElse = (primary, fallback) => primary || fallback
/** initializeToType :: (Type -> Mixed) -> Type  */
export const initializeToType = (ConstructorFn) => (item) => {
  return item instanceof ConstructorFn ? item : new ConstructorFn()
}
/** compose :: ..Fns -> Mixed */
export const compose = (...funcs) => {
  return (predicate) => {
    return funcs.reduceRight(
      (accum, fn) => {
        return fn(accum)
    }, predicate)
  }
}

/**
 * Run an array of functions against an array of arguments where
 * function at funcs[0] is called with arguments at subjects[0]
 * @type {Function}
 */
export const runWith = curry(function runWith(funcs, subjects) {
  subjects = padList(subjects, funcs.length, undefined);

  return list(funcs)
    .reduce((acc, func, index) => {
      acc.push(func(subjects[index]));
      return acc;
    }, []);
})
