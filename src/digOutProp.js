/**
 * Returns the value of a nested property or undefined if not accesible
 *
 * @param {string} prop nested property to check for. eg.: 'foo.bar.baz'
 *
 * @example const value = digOutProp('foo.bar.baz')(obj)
 */
const digOutProp = prop =>
  obj =>
    prop.split('.').reduce((acc, curr) => {
      try {
        return typeof acc[curr] !== 'undefined' ? acc[curr] : undefined
      } catch (e) {
        return undefined
      }
    }, obj)

export default digOutProp
