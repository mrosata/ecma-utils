/* globals describe, it */
import {expect} from 'chai'
import { strictEqual } from 'assert';
import {curry, curry2} from '../lib'

let abc
beforeEach(() => {
  abc = function abc(a, b, c) {
    return a + b + c
  }
})
describe('curry test', () => {
  it('should return a different function', () => {

    const curryAbc = curry(abc)
    expect(curryAbc).to.be.a('function')
    expect(curryAbc).to.not.equal(abc)
  })

})


describe('the curried function', () => {
  it('should return a different function if incomplete', () => {
    const curryAbc = curry(abc)
    const curryAbcCall1 = curryAbc(1)
    expect(curryAbc).to.be.a('function')
    expect(curryAbcCall1).to.not.equal(curryAbc)

    const curryAbcCall2 = curryAbcCall1(2)
    expect(curryAbcCall2).to.be.a('function')
    expect(curryAbcCall2).to.not.equal(curryAbcCall1)

    const curryAbcCall3 = curryAbcCall2(3)
    expect(curryAbcCall3).to.equal(6)
  })
})
