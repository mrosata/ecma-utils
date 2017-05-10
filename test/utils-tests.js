/*globals before, after, describe, it*/
import { utils } from '../lib/index.js'
import arrayUtils from '../src/functional/arrays.js'
import { expect } from 'chai'

const { compose } = utils
const { remove } = arrayUtils

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

describe('Array Utils', function() {

  it('should exist', function() {
    expect(arrayUtils).to.be.object
  })

  describe('#remove', function() {

    it('should exist', function() {
      expect(arrayUtils.remove).to.be.function
    })

    it('should not mutate subject', function() {
      const a = [1, 2, 3, 4, 5, 6]
      const aStr = JSON.stringify(a)
      const len = a.length
      expect(a).to.have.length(len)
      remove(2, 1, a)
      remove(1, 2, a)
      expect(a).to.have.length(len)
      expect(JSON.stringify(a)).to.equal(aStr)
    })

    it('should remove subsection of array', function() {
      const a = [1, 2, 3, 4, 5, 6]
      const b = remove(2, 1, a)
      const c = remove(1, 2, a)
      const d = remove(0, 3, a)
      expect(b).to.deep.equal([1, 2, 4, 5, 6])
      expect(c).to.deep.equal([1, 4, 5, 6])
      expect(d).to.deep.equal([4, 5, 6])
    })

    it('has no effect if amt is 0', function() {
      const a = [1, 2, 3, 4, 5, 6]
      const b = remove(2, 0, a)
      const c = remove(1, 0, a)
      const d = remove(0, 0, a)
      expect(b).to.deep.equal(a)
      expect(c).to.deep.equal(a)
      expect(d).to.deep.equal(a)
    })
  })
})
