import curry from '../utils/curry.js'
import curry2 from '../utils/curry2.js'


/** prop :: String -> Object -> α */
const prop = curry((name, obj) => obj[name])

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

/** apply :: Fn, [α] -> [β] */
const apply = curry((fn, mappable) => fn.apply(fn, mappable))


export default {prop, keys, set, get, at, apply}
