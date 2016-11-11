### ECMA-UTILS

Ecma utils is a library created for use in many different projects. As 
such it doesn't strictly adhere to one paradigm or coding style over 
another. That being said, most of the functions I've been writing lately
are to help with writing functional programming.

##### INSTALL
```bash
  npm i ecma-utils
  # or...
  yarn add ecma-utils
```

##### IS
The `is` class is a collection of static methods used for type 
validation. It is very simple to read and understand.
```javascript
if (is.array(someThing)) {
  console.log('jump for joy')
}
if (is.not(is.object(someItems)) {
  console.log('Hey! That's a no object!')
}
```


##### UTILS
The `utils` module is a bunch of lambda abstraction type functions. The 
typical kit is in there, `compose`, `map`, `reduce`, `pluck`, an 
assortment of array and string functions. This module is under the 
most development/testing at the moment. As such it is incomplete and 
subject to great change in both how it works and how it is used.


##### CACHE-ME
The `cache-me` module is built to wrap object methods with a private 
cache. At the moment it only works for objects and methods, pass a list
of strings as methods to wrap (to customize caching) or don't and the 
module will wrap each method on the object with a cache.

```js
    const abacus = {
      add() {/*...*/},
      mult() {/*...*/},
      rand() {/*...*/}
    }
    
    // Cache only the add and mult methods on abacus
    cacheMe(myObject, 'add', 'mult')
```


&nbsp;

------
> Comments, Suggestions, Talky-talks?
  - email Michael Rosata [mrosata1984@gmail.com](mrosata1984@gmail.com)

> Troubles, Issues, Uh-ohs and Boom-booms?
  - [Issues Page](https://github.com/mrosata/ecma-utils/issues)
  
> Thanks and Appreciation
 - [RollupJs](http://rollupjs.org/)
 - [BabelJs](https://babeljs.io/)
 - [Mocha Testing Framework](https://mochajs.org/)
 - [Chai Testing Library](http://chaijs.com/)
 - [Istanbul Code Coverage](https://github.com/gotwarlost/istanbul)
 - [NPM](https://www.npmjs.com/) and [Yarn](https://yarnpkg.com/) package management.
