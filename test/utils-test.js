/*globals before, after, describe, it*/
import {compose, isArray, } from '../lib/utils.js'
import {expect} from 'chai'

let f, g
before(() => {
  f = (x) => 10 + x
  g = (x) => 20 + x
})

describe('#compose utility function', () => {
  it('should obey laws of composition', () => {
    expect(compose(f, g)(10)).to.equal(f(g(10)))
  })
})


describe('#isArray utility function', () => {
  it('should reconize an empty array', () => {
    expect(isArray([])).to.be.true
  })
  it('should reconize an array with length', () => {
    expect(isArray([1, 2, 3, 4])).to.be.true
  })
  it('should not accept an object as an array', () => {
    expect(isArray({})).to.be.false
  })
})
