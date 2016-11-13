import curry from './curry.js'
import curry2 from './curry2.js'

const logger = typeof console === "undefined" ? {} : console

/**  noop :: Mixed -> _ */
const noop = (n) => void(n)

/**  bool :: Mixed -> Boolean */
const bool = (val) => !!val
/** int :: Mixed -> Integer */
const int = (val) => isNeg(val) ? 0 : +val

/** sum :: Number -> Number -> Number */
const sum = curry((a, b) => a + b)
/** multi :: Number -> Number -> Number */
const multi = curry((m, n) => m * n)
/** equiv :: α -> β -> Boolean */
const equiv = curry((a, b) => a == b)
/** equals :: α -> β -> Boolean */
const equals = curry((a, b) => a === b)
/** prop :: String -> Object -> α */
const prop = curry((name, obj) => obj[name])
/** equiv :: [α] -> Boolean */
const includes = curry((array, val) => array.includes(val))
/** list :: Mixed -> List  # create array from value or from another array */
const list = (a) => isArray(a) ? a.slice(0) : [].concat(a)
/**  keys :: Obj -> List */
const keys = obj => list(Object.keys(obj))
/** set :: Object, Prop, String -> Object */
const set = (obj, key, val) => Object.freeze(
  Object.assign({}, obj, {[key]: val}))
/** get :: Object, String -> Mixed */
const get = curry2((obj, key, def) => obj && obj.hasOwnProperty(key) ?
  obj[key] : def || noop(undefined))
/** at :: Obj, List -> List */
const at = (obj, propsList) => propsList.map(get(obj)).filter(isDefined)
/**  zip :: (List -> List) -> List */
const zip = (...array) =>
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
const unzipWith = (fn, array) => array
  .reduce((accum, items) => {
    accum.push(fn.apply(fn, items));
    return accum;
  }, [])
/** apply :: Fn, Mappable -> Mixed */
const apply = (fn, mappable) => fn.apply(fn, mappable)
/**  lastItem :: List -> Mixed */
const lastItem = (array) => list(array)[array.length - 1]
/**  lastIndex :: List -> Int */
const lastIndex = (array) => list(array).length - 1
/**  head :: List -> Mixed */
const head = (array) => list(array)[0]
/** pluck :: (List -> Int) -> Mixed */
const pluck = curry((array, idx) => list(array)[idx])
/** pluckN :: (Int -> List) -> Mixed */
const pluckN = curry((idx, array) => list(array)[idx])
/** immutableSplice :: (List -> Integer) -> List */
const immutableSplice = idx => array => list(array).slice(0, idx)
  .concat(list(array).slice(idx+1))
/**  count :: List -> Integer */
const count = (array) => isArray(array) && array.length ?
  array.length : 0
/**  push :: List, Mixed -> List  # unlike [].push, this returns the item (pointless to call list() here) */
const push = curry((array, item) => array.push(item) && item)
/**  map :: List -> Fn -> List */
const map = curry((fn, array) => list(array).map(fn))
/**  filter :: List -> Fn -> List */
const filter = fn => array => list(array).filter(fn)
/** reduce :: Fn -> List -> Mixed */
const reduce = curry2((fn, array, def) => array.length ?
  list(array).reduce(fn, def || noop()) : noop())
/** padList :: List, Int, Mixed -> List */
const padList = (array, len, val) => list(array).concat(
  new Array(Math.max(0, len - array.length)).fill(val))
/**  tap :: id -> id  # console log values from within pipes or chains */
const tap = (id) => {logger.log(id);return id;}
/**  lTap :: id -> id  # Add a label as a prefix to a tap() console output */
const lTap = (label) => (id) => {logger.log(label, id);return id;}
/** debug :: Func -> α -> α */
const debug = curry((cond, a) => {
  if (cond(a)) {
    debugger;
  }
  return a
})
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
const compose = (...funcs) => {
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
const runWith = curry(function runWith(funcs, subjects) {
  subjects = padList(subjects, funcs.length, undefined);

  return list(funcs)
    .reduce((acc, func, index) => {
      acc.push(func(subjects[index]));
      return acc;
    }, []);
})


export default {
  noop,
  bool,
  int,
  sum,
  list,
  keys,
  set,
  get,
  at,
  zip,
  unzipWith,
  apply,
  lastItem,
  lastIndex,
  head,
  pluck,
  pluckN,
  immutableSplice,
  count,
  push,
  map,
  filter,
  reduce,
  padList,
  tap,
  lTap,
  debug,
  minOf,
  maxOf,
  inRange,
  divideBy,
  divide,
  match,
  replaceAll,
  str,
  strMatchRE,
  strMatchStr,
  strToRegExp,
  ifOrElse,
  orElse,
  initializeToType,
  compose,
  runWith,
  sum,
  multi,
  equiv,
  equals,
  prop,
  includes
}
