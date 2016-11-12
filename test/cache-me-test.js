/* global it, describe, before, after */

import {expect} from 'chai'
import {cacheMe} from '../lib/index.js'

const getTestObject = () => {
  return {
    add(a, b) {
      return a + b
    },
    mult(a, b) {
      return a * b
    }
  }
}

describe('cache-me tests', () => {

  it('methods work without being cached',
    () => {
      const testObject = getTestObject()

      expect(testObject.add(15, 16)).to.equal(31)
      expect(testObject.mult(150, 11)).to.equal(1650)
    })


  it('The subject object is stored as "subject" on cache wrapper',
    () => {
      const testObject = getTestObject()
      const cachedObj = cacheMe(testObject, 'add', 'mult')

      expect(cachedObj._cache).to.be.an('object')
      expect(cachedObj.subject).to.deep.equal(testObject)
    })

  it('should wrap all methods when passed only 1 argument',
    () => {
      const testObject = getTestObject()
      const cachedObj = cacheMe(testObject)
      // Run methods (which should cache even though not explicity told to)
      const addResult = testObject.add(12.34, 54.23)
      const multResult = testObject.mult(12.34, 54.23)
      // Check the cache for those results
      const key = cachedObj.keyForArgs(12.34, 54.23)

      // Check that they are in the cache
      expect(cachedObj._cache['add'][key]).to.equal(addResult)
      expect(cachedObj._cache['mult'][key]).to.equal(multResult)
    })

  it('mutates the object passed into constructor',
    () => {
      const testObject = getTestObject()
      const cachedObject = cacheMe(testObject).subject

      expect(cachedObject).to.deep.equal(testObject)
    })


  it('always returns same result',
    () => {
      const args = [12.34, 56.78]
      const testObject = getTestObject()
      const firstResult = testObject.add(...args)
      const cachedObj = cacheMe(testObject, 'add')
      const secondResult = cachedObj.subject.add(...args)
      const thirdResult = testObject.add(...args)

      expect(secondResult).to.equal(firstResult)
      expect(cachedObj.subject.add(...args)).to.equal(firstResult)
      expect(cachedObj.subject.add(...args)).to.equal(thirdResult)
    })
})
