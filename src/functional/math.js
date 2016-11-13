import curry from '../utils/curry.js'
import curry2 from '../utils/curry2.js'

/** sum :: Number -> Number -> Number  */
const sum = curry((a, b) => a + b)

/** multi :: Number -> Number -> Number  */
const multi = curry((m, n) => m * n)

/** minOf :: Number, Number -> Number  */
const minOf = curry((min, num) => Math.max(min, num))

/** maxOf :: Number, Number -> Number  */
const maxOf = curry((max, num) => Math.min(max, num))

/** inRange :: (Number -> Number -> Number) -> Number  */
const inRange = curry2((num, min, max) => maxOf(minOf(min, num), max))

/** divideBy :: (Number -> Number) -> Float  */
const divideBy = curry((denom, numer) => numer / denom)

/** divide :: (Number -> Number) -> Float  */
const divide = curry((numer, denom) => numer / denom)


export default {sum, multi, minOf, maxOf, inRange, divideBy, divide}
