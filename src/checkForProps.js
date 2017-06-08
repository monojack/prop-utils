import digOutOwnProp from './digOutOwnProp'

/**
 * checks whether a list of nested properties exist
 * ultimately return true or false
 *
 * @param {any} props one ore a list of nested properties to check for. eg.: ['foo.bar.baz', 'lorem.ipsum']
 *
 * @example const bool = checkForProps(['foo.bar.baz', 'lorem.ipsum'])(obj)
 */
function checkForProps (props) {
  return obj => [].concat(...[ ...arguments, ]).every(query => typeof digOutOwnProp(query)(obj) !== 'undefined')
}

export default checkForProps
