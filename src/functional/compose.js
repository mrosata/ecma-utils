
// compose :: (α -> β) ...(β -> γ) -> (α -> γ)
const compose = (...funcs) => {
  return (predicate) => {
    return funcs.reduceRight(
      (accum, fn) => {
        return fn(accum)
      }, predicate)
  }
}


export default compose
