const getTOCText = require('../../../src/getTOCText')
const data = require('../../data/outline.json')
const assert = require('assert')

describe('getTOCText', () => {
  it('writes the TOC pages using the writer', async () => {
    const text = getTOCText(data, 3)
    assert.strictEqual(text.length, 80)
    const linesContainingPage9 = text.filter(line => line.line.indexOf('..8') > 0)
    assert.strictEqual(linesContainingPage9.length, 18)
  })

  it('page offset respected', async () => {
    const text = getTOCText(data, 1)
    assert.strictEqual(text.length, 80)
    const linesContainingPage9 = text.filter(line => line.line.indexOf('..8') > 0)
    assert.strictEqual(linesContainingPage9.length, 0)
  })
})
