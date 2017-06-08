import { expect, } from 'chai'
import { checkForProps, } from './../src'

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

describe('checkForProps', () => {
  it('should return true even if the property is not nested', () => {
    expect(checkForProps([ 'foo', ])(obj)).to.be.true
  })

  it('should return true even if the property value is falsy', () => {
    expect(checkForProps([ 'foo.bar.grault', ])(obj)).to.be.true
  })

  it('should return true only if all the properties are found', () => {
    expect(checkForProps([ 'foo', 'foo.waldo', 'foo.bar.grault', 'foo.waldo.4', ])(obj)).to.be.true
    expect(checkForProps([ 'foo', 'foo.waldo', 'foo.bar.waldo', ])(obj)).to.be.false
  })

  it('should return false if at least one property is not found', () => {
    expect(checkForProps([ 'foo', 'foo.waldo', 'foo.bar.waldo', ])(obj)).to.be.false
  })

  it('should be able to accept a query that is not an array', () => {
    expect(checkForProps('foo.waldo')(obj)).to.be.true
    expect(checkForProps('foo.fred')(obj)).to.be.false
  })

  it('should be able to accept queries provided as multiple arguments', () => {
    expect(checkForProps('foo', 'foo.waldo', 'foo.bar.grault')(obj)).to.be.true
    expect(checkForProps('foo', 'foo.fred', 'foo.bar.grault')(obj)).to.be.false
  })
})
