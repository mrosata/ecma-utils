/**
 * These are logging and debugging functions to assist composition
 * analysis.All the functions in this file are impure in the respect
 * that they all do IO without using a functor to abstract the
 * impurity.
 */
import logger from '../logger.js'
import curry from '../utils/curry.js'


/**  tap :: α -> α    */
const tap = (id) => {
  logger.log(id);
  return id;
}


/**  lTap :: α -> α   */
const lTap = curry((label, id) => {
  logger.log(label, id);
  return id;
})


/** debug :: (α -> Boolean) -> α -> α   */
const debug = curry((cond, a) => {
  if (cond(a)) {
    debugger;
  }
  return a
})

export default {
  tap, lTap, debug,
}
