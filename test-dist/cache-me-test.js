'use strict';

/* global it, describe, before, after */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

var expect = require('chai').expect;
var cacheMe = require('../dist/cache-me').default;

var getTestObject = function getTestObject() {
  return {
    add: function add(a, b) {
      return a + b;
    },
    mult: function mult(a, b) {
      return a * b;
    }
  };
};

describe('cache-me tests', function () {

  it('methods work without being cached', function () {
    var testObject = getTestObject();

    expect(testObject.add(15, 16)).to.equal(31);
    expect(testObject.mult(150, 11)).to.equal(1650);
  });

  it('The subject object is stored as "subject" on cache wrapper', function () {
    var testObject = getTestObject();
    var cachedObj = cacheMe(testObject, 'add', 'mult');

    expect(cachedObj._cache).to.be.an('object');
    expect(cachedObj.subject).to.deep.equal(testObject);
  });

  it('should wrap all methods when passed only 1 argument', function () {
    var testObject = getTestObject();
    var cachedObj = cacheMe(testObject);
    // Run methods (which should cache even though not explicity told to)
    var addResult = testObject.add(12.34, 54.23);
    var multResult = testObject.mult(12.34, 54.23);
    // Check the cache for those results
    var key = cachedObj.keyForArgs(12.34, 54.23);

    // Check that they are in the cache
    expect(cachedObj._cache['add'][key]).to.equal(addResult);
    expect(cachedObj._cache['mult'][key]).to.equal(multResult);
  });

  it('mutates the object passed into constructor', function () {
    var testObject = getTestObject();
    var cachedObject = cacheMe(testObject).subject;

    expect(cachedObject).to.deep.equal(testObject);
  });

  it('always returns same result', function () {
    var _cachedObj$subject, _cachedObj$subject2;

    var args = [12.34, 56.78];
    var testObject = getTestObject();
    var firstResult = testObject.add.apply(testObject, args);
    var cachedObj = cacheMe(testObject, 'add');
    var secondResult = (_cachedObj$subject = cachedObj.subject).add.apply(_cachedObj$subject, args);
    var thirdResult = testObject.add.apply(testObject, args);

    expect(secondResult).to.equal(firstResult);
    expect((_cachedObj$subject2 = cachedObj.subject).add.apply(_cachedObj$subject2, args)).to.equal(firstResult);
  });
});