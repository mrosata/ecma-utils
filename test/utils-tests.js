/*globals before, after, describe, it*/
import {utils} from '../lib/index.js'
import {expect} from 'chai'


const {compose} = utils


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
