/**
 * Returns the value of a nested property or undefined if not accesible
 *
 * @param {string} prop nested property to check for. eg.: 'foo.bar.baz'
 *
 * @example const value = digOutOwnProp('foo.bar.baz')(obj)
 */
const digOutOwnProp = prop =>
  obj =>
    prop.split('.').reduce((acc, curr) => {
      try {
        return acc.hasOwnProperty(curr) ? acc[curr] : undefined
      } catch (e) {
        return undefined
      }
    }, obj)

export default digOutOwnProp
