import { isObject } from './validation/is-func.js'

export const noConsole = isObject(console)

export const logger = noConsole ? {} : console

export default {
  noConsole,
  logger,
}
