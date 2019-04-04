/* eslint "no-unused-expressions": "off" */
const addTOCPages = require('../../../src/addTOCPages')
const countOutline = require('../../../src/countOutline')
const countPages = require('../../../src/countPages')
const getTOCText = require('../../../src/getTOCText')
const data = require('../../data/outline.json')

const outlineSize = countOutline(data)
const howManyPages = countPages(outlineSize)
const tocText = getTOCText(data, howManyPages)

describe('addTOCPages', () => {
  let writer, pageCtx, etSpy
  beforeEach(() => {
    etSpy = sinon.spy()
    pageCtx = {
      BT: () => ({k: () => ({Tf: () => ({Tm: () => ({Tj: () => ({ET: etSpy})})})})})
    }
    writer = {
      startPageContentContext: sinon.stub().returns(pageCtx),
      getFontForFile: sinon.spy(),
      createPage: sinon.stub().returns(1),
      writePage: sinon.spy()
    }
  })

  it('writes the TOC pages using the writer', async () => {
    addTOCPages(writer, tocText)
    writer.startPageContentContext.callCount.should.equal(3)
    writer.getFontForFile.should.have.been.calledOnce
    writer.createPage.callCount.should.equal(3)
    writer.writePage.callCount.should.equal(3)
    etSpy.callCount.should.equal(82)
  })

  it('handles no input fine', async () => {
    addTOCPages(writer, [])
    writer.startPageContentContext.callCount.should.equal(1)
    writer.getFontForFile.should.have.been.calledOnce
    writer.createPage.callCount.should.equal(1)
    writer.writePage.callCount.should.equal(1)
    etSpy.callCount.should.equal(2)
  })

  it('fake font for coverage, cheap I know', async () => {
    addTOCPages(writer, tocText, 'hahathisisntreallyafont')
    writer.startPageContentContext.callCount.should.equal(3)
    writer.getFontForFile.should.have.been.calledOnce
    writer.createPage.callCount.should.equal(3)
    writer.writePage.callCount.should.equal(3)
    etSpy.callCount.should.equal(82)
  })
})
