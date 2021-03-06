/*globals before, after, describe, it*/
import isFunc from '../src/validation/is-func.js'
import {expect} from 'chai'


const {
  isArray,
  isBool,
  isString,
  isNeg,
  isNone, isDefined, isCallable,
  isNumber,
  isObject,
  neg,
} = isFunc


/*** isArray ***/
describe('#isArray utility function', () => {
  it('should recognize an empty array', () => {
    expect(isArray([])).to.equal(true)
  })
  it('should recognize an array with length', () => {
    expect(isArray([1, 2, 3, 4])).to.equal(true)
  })
  it('should not accept an object as an array', () => {
    expect(isArray({})).to.equal(false)
  })
})


/*** isObject ***/

describe('#isObject utility function', () => {
  it('should recognize an empty object', () => {
    expect(isObject({})).to.equal(true)
  })
  it('should not recognize null as an object', () => {
    expect(isObject(null)).to.equal(false)
  })
  it('should not recognize primative booleans as objects', () => {
    expect(isObject(false)).to.equal(false)
    expect(isObject(true)).to.equal(false)
  })
  it('should not recognize functions as an object', () => {
    expect(isObject(function notAnObject(a,b) {})).to.equal(false)
    expect(isObject((a,b) => a + b)).to.equal(false)
  })
  it('should not recognize false as an object', () => {
    expect(isObject(false)).to.equal(false)
  })
  it('should recognize an array with properties', () => {
    expect(isObject({name: 'capn test\'s-alot'})).to.equal(true)
  })
  it('should not accept an array as an object', () => {
    expect(isObject([])).to.equal(false)
  })
})
