/* global it, describe, before, after */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

var expect = require('chai').expect
var cacheMe = require('../dist/cache-me').default


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
      let testObject = getTestObject()

      expect(testObject.add(15, 16)).to.equal(31)
      expect(testObject.mult(150, 11)).to.equal(1650)
    })


  it('The subject object is stored as "subject" on cache wrapper',
    () => {
      let testObject = getTestObject()
      let cachedObj = cacheMe(testObject, 'add', 'mult')

      expect(cachedObj._cache).to.be.an('object')
      expect(cachedObj.subject).to.deep.equal(testObject)
    })

  it('should wrap all methods when passed only 1 argument',
    () => {
      let testObject = getTestObject()
      let cachedObj = cacheMe(testObject)
      // Run methods (which should cache even though not explicity told to)
      let addResult = testObject.add(12.34, 54.23)
      let multResult = testObject.mult(12.34, 54.23)
      // Check the cache for those results
      let key = cachedObj.keyForArgs(12.34, 54.23)

      // Check that they are in the cache
      expect(cachedObj._cache['add'][key]).to.equal(addResult)
      expect(cachedObj._cache['mult'][key]).to.equal(multResult)
    })

  it('mutates the object passed into constructor',
    () => {
      let testObject = getTestObject()
      let cachedObject = cacheMe(testObject).subject

      expect(cachedObject).to.deep.equal(testObject)
    })


  it('always returns same result',
    () => {
      const args = [12.34, 56.78]
      let testObject = getTestObject()
      let firstResult = testObject.add(...args)
      let cachedObj = cacheMe(testObject, 'add')
      let secondResult = cachedObj.subject.add(...args)
      let thirdResult = testObject.add(...args)

      expect(secondResult).to.equal(firstResult)
      expect(cachedObj.subject.add(...args)).to.equal(firstResult)
    })
})
