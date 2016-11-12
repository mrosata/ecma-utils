/*globals before, after, describe, it*/
import {utils} from '../lib/index.js'
import {expect} from 'chai'


const {compose, isArray, isObject} = utils


let f, g
before(() => {
  f = (x) => 10 + x
  g = (x) => 20 + x
})

/*** compose ***/
describe('#compose utility function', () => {
  it('should obey laws of composition', () => {
    expect(compose(f, g)(10)).to.equal(f(g(10)))
  })
})


/*** isArray ***/
describe('#isArray utility function', () => {
  it('should reconize an empty array', () => {
    expect(isArray([])).to.equal(true)
  })
  it('should reconize an array with length', () => {
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
  it('should not recongnize false as an object', () => {
    expect(isObject(false)).to.equal(false)
  })
  it('should recognize an array with properties', () => {
    expect(isObject({name: 'capn test\'s-alot'})).to.equal(true)
  })
  it('should not accept an array as an object', () => {
    expect(isObject([])).to.equal(false)
  })
})
