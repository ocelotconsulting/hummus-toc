const countPages = require('../../../src/countPages')
const assert = require('assert')

describe('countPages', () => {
  it('counts pages ok', async () => {
    const count = countPages(80)
    assert.strictEqual(count, 3)
  })
  it('counts empty ok', async () => {
    const count = countPages(0)
    assert.strictEqual(count, 1)
  })
  it('counts single ok', async () => {
    const count = countPages(1)
    assert.strictEqual(count, 1)
  })
})
