
const consoleUndefined = typeof console === "undefined"

export const logger = consoleUndefined ? {} : console
