import curry from '../utils/curry.js'
import curry2 from '../utils/curry2.js'
import is from '../validation/is-func.js'


// list :: α -> [α]
const list = (a) => is.isArray(a) ? [...a] : [a]

// includes :: [α] -> Boolean
const includes = curry((array, val) => array.includes(val))

// last :: [α] -> α
const last = (array) => list(array)[array.length - 1]

// lastIndex :: [α] -> Int
const lastIndex = (array) => list(array).length - 1

// head :: [α] -> α
const head = (array) => list(array)[0]

// nth :: (Int -> [α]) -> α
const nth = curry((idx, array) => list(array)[idx])

// remove :: Int -> Int -> ([α] -> [α])
const remove = curry((start, amt, array) => [
    ...list(array).slice(0, start),
    ...list(array).slice(start + amt)
  ]
)

//  count :: [α] -> Int
const count = (array) => isArray(array) && array.length ?
  array.length : 0

//  push :: [α] -> α -> [α]
const push = curry((array, item) => array.push(item) && item)

//  map :: [α] -> Fn -> [β]
const map = curry((fn, array) => list(array).map(fn))

//  filter :: [α] -> Fn -> [α]
const filter = curry((fn, array) => list(array).filter(fn))

// reduce :: Fn -> [α] -> β
const reduce = curry2((fn, array, def) => array.length ?
  list(array).reduce(fn, def || noop()) : noop())

// padList :: [], Int, β -> [β]
const padList = curry((array, len, val) => list(array).concat(
  new Array(Math.max(0, len - array.length)).fill(val)))


//  zip :: ([α] -> [β]) -> [[α, β]]
const zip = (...array) =>
  new Array(Math.max.apply(null, array.map(a=>a.length)))
    .fill(null)
    .map((_, index) => {

      return array.reduce((accum, _array) => {
        var _item = _array && _array.length > index ? _array[index]: undefined;
        accum.push(_item);
        return accum;
      }, [])
    })


//  unzip :: ([[α]] -> [β]) -> [[α]] -> [β]
const unzipWith = (fn, array) => array
  .reduce((accum, items) => {
    accum.push(fn.apply(fn, items));
    return accum;
  }, [])


export default {
  count,
  filter,
  head,
  includes,
  last,
  lastIndex,
  list,
  map,
  nth,
  padList,
  push,
  reduce,
  remove,
  unzipWith,
  zip,
}
