const countOutline = require('../../../src/countOutline')
const data = require('../../data/outline.json')
const assert = require('assert')

describe('countOutline', () => {
  it('counts outline ok', async () => {
    const count = countOutline(data)
    assert.strictEqual(count, 80)
  })
  it('counts empty ok', async () => {
    const count = countOutline([])
    assert.strictEqual(count, 0)
  })
  it('counts no children ok', async () => {
    const count = countOutline([{hello: 'whatever'}])
    assert.strictEqual(count, 1)
  })
})
