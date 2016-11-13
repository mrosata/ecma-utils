/*
 * ECMA-UTILS
 *   @author: Michael Rosata
 *   @desc: Utilities for use in JavaScript projects
 *          Import all inter-dependant modules from this
 *          index, this only applies to code ran within
 *          this repo, but also these will more than likely
 *          be the modules which have been tested.
 */

import is from '../src/is.js'
import isFunc from '../src/is-func.js'
import utils from '../src/utils.js'
import cacheMe from '../src/cache-me.js'
import curry from '../src/curry.js'
import curry2 from '../src/curry2.js'


export {
  curry,
  curry2,
  is,
  isFunc,
  utils,
  cacheMe
}
