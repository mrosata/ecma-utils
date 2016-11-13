import curry from './utils/curry.js'
import compose from './functional/compose.js'

/** equiv :: α -> β -> Boolean */
const equiv = curry((a, b) => a == b)

/** equals :: α -> β -> Boolean */
const equals = curry((a, b) => a === b)

/** ifOrElse :: Mixed, Success, Failure -> Success|Failure */
const ifOrElse = (condition, ifTrue, ifFalsey) => !!condition ?
  ifTrue : ifFalsey

/** orElse :: Mixed, Success, Failure -> Success|Failure */
const orElse = (primary, fallback) => primary || fallback

/** initializeToType :: (Type -> Mixed) -> Type  */
const initializeToType = (ConstructorFn) => (item) => {
  return item instanceof ConstructorFn ? item : new ConstructorFn()
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
  compose,
  equiv, equals, ifOrElse, orElse, initializeToType, runWith
}
