/*
 * ECMA-UTILS
 *   @author: Michael Rosata
 *   @desc: Utilities for use in JavaScript projects
 *          Import all inter-dependant modules from this
 *          index, this only applies to code ran within
 *          this repo, but also these will more than likely
 *          be the modules which have been tested.
 */

import is from '../src/validation/is.js'
import isFunc from '../src/validation/is-func.js'
import utils from '../src/utils.js'
import cacheMe from '../src/caching/cache-me.js'
import curry from '../src/utils/curry.js'
import curry2 from '../src/utils/curry2.js'


export {
  curry,
  curry2,
  is,
  isFunc,
  utils,
  cacheMe
}
