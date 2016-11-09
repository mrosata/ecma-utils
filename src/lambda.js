import {curry} from './curry.js'

/********************************************************/
/* * * * * * * * * * * Utilities * * * * * * * * * * * * /
-*/
export default {
  /**  isArray :: Mixed -> Boolean */
  isArray = (mixed) => Array.isArray(mixed),
  /** isCallable :: Mixed -> Boolean */
  isCallable = (mixed) => typeof mixed === "function",
  /**  isArray :: Mixed -> Boolean */
  isObject = (mixed) => !!mixed && typeof mixed === "object",
  /**  isDefined :: Mixed -> Boolean */
  isDefined = (mixed) => typeof mixed !== "undefined",
  /**  isBool :: Mixed -> Boolean */
  isBool = (mixed) => typeof mixed !== "boolean",
  /**  isBool :: Mixed -> Boolean */
  isNone = (mixed) => mixed === null,
  /**  not :: Mixed -> Boolean # tests if falsey */
  not = (val) => !val,
  /**  isNeg :: Mixed -> Boolean  # falsy and not zero */
  isNeg = (val) => !val && val !== 0,
  /**  noop :: Mixed -> Boolean */
  noop = (n) => void(n),
  /**  bool :: Mixed -> Boolean */
  bool = (val) => !!val,
  /** int :: Mixed -> Integer */
  int = (val) => isNeg(val) ? 0 : +val,
  /** sum :: Number -> Number -> Number */
  sum = curry((a, b) => a + b ),
  /** list :: Mixed -> List  # create array from value or from another array */
  list = (mixed) => isArray(mixed) ? mixed.slice(0) : [].concat(mixed),
  /**  keys :: Obj -> List */
  keys = obj => list(Object.keys(obj)),
  /** get :: Object, String -> Mixed */
  get = curry2((obj, key, def) => obj && obj.hasOwnProperty(key) ? obj[key] : def || noop(undefined)),
  /** at :: Obj, List -> List */
  at = (obj, propsList) => propsList.map(get(obj)).filter(isDefined),
  /**  zip :: (List -> List) -> List */
  zip = (...arrayish) =>
    new Array(Math.max.apply(null, arrayish.map(a=>a.length)))
      .fill(noop(null))
      .map((_, index) => {

        return arrayish.reduce((accum, _array) => {
          var _item = _array && _array.length > index ? _array[index]: undefined;
          accum.push(_item);
          return accum;
        }, [])
      }),

  /**  unzip :: (List -> List) -> Mixed */
  unzipWith = (fn, arrayish) => arrayish
    .reduce((accum, items) => {
      accum.push(fn.apply(fn, items));
      return accum;
    }, []),
  /** apply :: Fn, Mappable -> Mixed */
  apply = (fn, mappable) => fn.apply(fn, mappable),
  /**  lastItem :: List -> Mixed */
  lastItem = (arrayish) => list(arrayish)[arrayish.length - 1],
  /**  lastIndex :: List -> Int */
  lastIndex = (arrayish) => list(arrayish).length - 1,
  /**  head :: List -> Mixed */
  head = (arrayish) => list(arrayish)[0],
  /** pluck :: (List -> Int) -> Mixed */
  pluck = curry((arrayish, idx) => list(arrayish)[idx]),
  /** pluckN :: (Int -> List) -> Mixed */
  pluckN = curry((idx, arrayish) => list(arrayish)[idx]),
  /** immutableSplice :: (List -> Integer) -> List */
  immutableSplice = idx => arrayish => list(arrayish).slice(0, idx).concat(list(arrayish).slice(idx+1)),
  /**  count :: List -> Integer */
  count = (arrayish) => isArray(arrayish) && arrayish.length ? arrayish.length : 0,
  /**  push :: List, Mixed -> List  # unlike [].push, this returns the item (pointless to call list() here) */
  push = curry((arrayish, item) => arrayish.push(item) && item),
  /**  map :: List -> Fn -> List */
  map = curry((fn, arrayish) => list(arrayish).map(fn)),
  /**  filter :: List -> Fn -> List */
  filter = fn => arrayish => list(arrayish).filter(fn),
  /** reduce :: Fn -> List -> Mixed */
  reduce = curry2((fn, arrayish, def) => arrayish && arrayish.length ? list(arrayish).reduce(fn, def || noop()) : noop()),
  /** padList :: List, Int, Mixed -> List */
  padList = (arrayish, len, val) => list(arrayish).concat(new Array(Math.max(0, len - arrayish.length)).fill(val)),
  /**  tap :: id -> id  # console log values from within pipes or chains */
  tap = (id) => {console.log(id);return id;},
  /**  lTap :: id -> id  # Add a label as a prefix to a tap() console output */
  lTap = (labelString) => (id) => {console.log(labelString, id);return id;},
  /** minOf :: Num, Num -> Num */
  minOf = (min, num) => Math.max(min, num),
  /** maxOf :: Num, Num -> Num */
  maxOf = (max, num) => Math.min(max, num),
  /** inRange :: (Num -> Num -> Num) -> Num  # inclusive boundaries*/
  inRange = curry2((num, min, max) => maxOf(minOf(min, num), max)),
  /** divideBy :: (Number -> Number) -> Float */
  divideBy = curry((denom, numer) => numer / denom),
  /** divide :: (Number -> Number) -> Float */
  divide = curry((numer, denom) => numer / denom),
  /** match :: Str -> List  # note: this forces the global flag */
  match = curry((re, str) => {
    if (re.flags.indexOf('g') === -1) {
      re.compile(re.source, `${re.flags}g`);}
    return str.match(re);
  }),
  /**  replaceAll */
  replaceAll = (text, re, replacement) => (text || '').replace(re, replacement),
  /** str :: Mixed -> String */
  str = (mixed) => isObject(mixed) && mixed.toString ? mixed.toString : ''.concat(mixed),
  /** strMatchRE :: Str -> RegExp -> List */
  strMatchRE = curry((text, re) => text.match(re)),
  /** strMatchStr :: Str -> Str -> Bool */
  strMatchStr = curry((textStr1, textStr2) => str(textStr1).length === str(textStr2).length && textStr1.indexOf(textStr2) === 0),
  /**  strToRegExp :: Str -> RegExp */
  strToRegExp = (str) => new RegExp(`\\b${replaceAll(str, /(\?|\*|\+|\.|\(|\)|\[\$|\^)/, '\\$1')}\\b`, 'gim'),
  /** ifOrElse :: Mixed, Success, Failure -> Success|Failure */
  ifOrElse = (condition, ifTrue, ifFalsey) => !!condition ? ifTrue : ifFalsey,
  /** orElse :: Mixed, Success, Failure -> Success|Failure */
  orElse = (primary, fallback) => primary || fallback,
  /** initializeToType :: (Type -> Mixed) -> Type  # If item is of Type, return item, else new Type() */
  initializeToType = (ConstructorFn) => (item) => item instanceof ConstructorFn ? item : new ConstructorFn(),
  /** compose :: ..Fns -> Mixed */
  compose = (...fns) => (catalyst) => {
    return fns.reduce((accum, fn) => {
      return fn.apply(null, accum);
    }, (catalyst || noop()));
  },
  /**
   * Run an array of functions against an array of arguments where
   * function at funcs[0] is called with arguments at subjects[0]
   * @type {Function}
   */
  runWith = curry(function runWith(funcs, subjects) {
  subjects = padList(subjects, funcs.length, undefined);

  return list(funcs)
    .reduce((acc, func, index) => {
      acc.push(func(subjects[index]));
      return acc;
    }, []);
  })
};
