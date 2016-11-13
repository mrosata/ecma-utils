import curry from '../utils/curry.js'

/** match :: Str -> List  # note: this forces the global flag */
const match = curry((re, str) => {
  if (re.flags.indexOf('g') === -1) {
    re.compile(re.source, `${re.flags}g`);}
  return str.match(re);
})

/**  replaceAll */
const replaceAll = curry((text, re, replacement) => (text || '')
  .replace(re, replacement))

/** str :: Mixed -> String */
const str = (mixed) => isObject(mixed) && mixed.toString ?
  mixed.toString : ''.concat(mixed)

/** strMatchRE :: Str -> RegExp -> List */
const strMatchRE = curry((text, re) => text.match(re))

/** strMatchStr :: Str -> Str -> Bool */
const strMatchStr = curry(
  (textStr1, textStr2) => {
    return str(textStr1).length === str(textStr2).length &&
      textStr1.indexOf(textStr2) === 0
  })

/**  strToRegExp :: Str -> RegExp */
const strToRegExp = (str) => new RegExp(
  `\\b${replaceAll(str, /(\?|\*|\+|\.|\(|\)|\[\$|\^)/, '\\$1')}\\b`, 'gim')


export default {match, replaceAll, str, strMatchStr, strMatchRE, strToRegExp}
