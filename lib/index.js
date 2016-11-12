/*
 * ECMA-UTILS
 *   @author: Michael Rosata
 *   @desc: Utilities for use in JavaScript projects
 *          Import all inter-dependant modules from this
 *          index, this only applies to code ran within
 *          this repo, but also these will more than likely
 *          be the modules which have been tested.
 */

import is from './is.js'
import cacheMe from './cache-me.js'
import curry from './curry.js'
import curry2 from './curry2.js'


export {
  curry,
  curry2,
  is,
  cacheMe,
  log
}


function log(item) {
  console.log(item)
  return item
}
