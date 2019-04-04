const translatePageNumbers = require('../../../src/translatePageNumbers')
const countOutline = require('../../../src/countOutline')
const outline = require('../../data/outline.json')
const assert = require('assert')

describe('translatePageNumbers', () => {
  let parser

  beforeEach(() => {
    parser = {
      getPageObjectID: sinon.stub().returns(Math.floor(Math.random() * 11))
    }
  })

  it('translates page numbers ok', async () => {
    const beforeTranslationCount = countOutline(outline[0].children) + 1
    const translated = translatePageNumbers(parser, outline[0])
    parser.getPageObjectID.callCount.should.equal(beforeTranslationCount)
    assert.strictEqual(beforeTranslationCount, countOutline(translated.children) + 1)
  })

  it('translates specific input', async () => {
    const smallOutline = [{page: 1, children: [{page: 2}]}]
    const beforeTranslationCount = countOutline(smallOutline[0].children) + 1
    const translated = translatePageNumbers(parser, smallOutline[0])
    sinon.assert.calledWithExactly(parser.getPageObjectID.firstCall, 1)
    sinon.assert.calledWithExactly(parser.getPageObjectID.secondCall, 2)
    parser.getPageObjectID.callCount.should.equal(2)
    parser.getPageObjectID.reset()
    assert.strictEqual(beforeTranslationCount, countOutline(translated.children) + 1)

    const translated2 = translatePageNumbers(parser, smallOutline[0], 3)
    sinon.assert.calledWithExactly(parser.getPageObjectID.firstCall, 4)
    sinon.assert.calledWithExactly(parser.getPageObjectID.secondCall, 5)
    parser.getPageObjectID.callCount.should.equal(2)
    assert.strictEqual(beforeTranslationCount, countOutline(translated2.children) + 1)
  })
})
