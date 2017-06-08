import { expect, } from 'chai'
import { digOutOwnProp, digOutProp, } from './../src'

const obj = {
  foo: {
    bar: {
      baz: 'hello',
      qux: '',
      corge: null,
      grault: false,
      garply: 0,
    },
    waldo: [
      'hello from array', true, 1, {}, [],
    ],
  },
}

describe('digOutOwnProp', () => {
  it('should return a deeply nested property if available', () => {
    expect(digOutOwnProp('foo.bar.baz')(obj)).to.equal('hello')

    expect(digOutProp('foo.bar.baz')(obj)).to.equal('hello')
  })

  it('should return `undefined` if no property found', () => {
    expect(digOutOwnProp('foo.qux.baz')(obj)).to.be.undefined

    expect(digOutProp('foo.qux.baz')(obj)).to.be.undefined
  })

  it('should return `undefined` if only allowed to dig out own properties', () => {
    expect(digOutOwnProp('toString')(obj)).to.be.undefined

    expect(digOutProp('toString')(obj)).to.be.a('function')
  })

  it('should be able to return values from array indexes', () => {
    expect(digOutOwnProp('foo.waldo.0')(obj)).to.equal('hello from array')

    expect(digOutProp('foo.waldo.0')(obj)).to.equal('hello from array')
  })

  it('should be able to return falsy values', () => {
    expect(digOutOwnProp('foo.bar.qux')(obj)).to.equal('')
    expect(digOutOwnProp('foo.bar.corge')(obj)).to.be.null
    expect(digOutOwnProp('foo.bar.grault')(obj)).to.be.false
    expect(digOutOwnProp('foo.bar.garply')(obj)).to.equal(0)

    expect(digOutProp('foo.bar.qux')(obj)).to.equal('')
    expect(digOutProp('foo.bar.corge')(obj)).to.be.null
    expect(digOutProp('foo.bar.grault')(obj)).to.be.false
    expect(digOutProp('foo.bar.garply')(obj)).to.equal(0)
  })

  it('should be able to return truthy values', () => {
    expect(digOutOwnProp('foo.waldo.1')(obj)).to.be.true
    expect(digOutOwnProp('foo.waldo.2')(obj)).to.equal(1)
    expect(digOutOwnProp('foo.waldo.3')(obj)).to.be.an('object')
    expect(digOutOwnProp('foo.waldo.4')(obj)).to.be.an('array')

    expect(digOutProp('foo.waldo.1')(obj)).to.be.true
    expect(digOutProp('foo.waldo.2')(obj)).to.equal(1)
    expect(digOutProp('foo.waldo.3')(obj)).to.be.an('object')
    expect(digOutProp('foo.waldo.4')(obj)).to.be.an('array')
  })
})
