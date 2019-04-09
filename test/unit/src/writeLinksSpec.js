/* eslint "no-unused-expressions": "off" */
const proxyquire = require('../proxyquire')
const getTOCText = require('../../../src/getTOCText')
const data = require('../../data/outline.json')

describe('writeLinks', () => {
  let objCtx, copyCtx, parser, pageObj, toJSObject, createLinkStub, linky, writeLinks, dictCtx

  beforeEach(() => {
    linky = {hello: 'newman'}
    createLinkStub = sinon.stub().returns(linky)
    writeLinks = proxyquire('src/writeLinks', {
      './createLink': createLinkStub
    })
    pageObj = {
      blah: 1,
      Annots: 'got ya'
    }
    toJSObject = sinon.stub().returns(pageObj)

    dictCtx = {
      writeKey: sinon.spy(),
      writeNameValue: sinon.spy()
    }
    parser = {
      getPageObjectID: sinon.stub().returns(Math.floor(Math.random() * 11)),
      parsePage: sinon.stub().returns({getDictionary: () => ({toJSObject})})
    }
    copyCtx = {
      copyDirectObjectAsIs: sinon.spy()
    }
    objCtx = {
      startNewIndirectObject: sinon.spy(),
      writeIndirectObjectReference: sinon.spy(),
      startDictionary: sinon.stub().returns(dictCtx),
      startArray: sinon.spy(),
      writeName: sinon.spy(),
      startFreeContext: sinon.spy(),
      startModifiedIndirectObject: sinon.spy(),
      endArray: sinon.stub().returns({endLine: () => ({endDictionary: () => ({endIndirectObject: sinon.spy()})})})
    }
  })

  it('writes the TOC pages using the writer', async () => {
    const howManyPages = 3
    const pageSize = 33
    const numZeros = 2 // 2 entries have value of 0 in outline for this page
    const tocText = getTOCText(data, howManyPages)
    writeLinks(objCtx, copyCtx, parser, 1, tocText, howManyPages, pageSize)
    sinon.assert.calledWithExactly(parser.getPageObjectID.firstCall, 1)
    parser.getPageObjectID.callCount.should.equal(1 + pageSize - numZeros)

    createLinkStub.callCount.should.equal(pageSize - numZeros)
    sinon.assert.calledWithExactly(createLinkStub.firstCall, objCtx, sinon.match.number, sinon.match.array)

    objCtx.startModifiedIndirectObject.callCount.should.equal(1)
    sinon.assert.calledWithExactly(objCtx.startModifiedIndirectObject.firstCall, sinon.match.number)

    objCtx.startDictionary.callCount.should.equal(1)

    dictCtx.writeKey.callCount.should.equal(2)
    sinon.assert.calledWithExactly(dictCtx.writeKey.firstCall, 'blah')
    sinon.assert.calledWithExactly(dictCtx.writeKey.secondCall, 'Annots')

    sinon.assert.calledWithExactly(copyCtx.copyDirectObjectAsIs.firstCall, 1)
    copyCtx.copyDirectObjectAsIs.should.have.been.calledOnce

    objCtx.startArray.callCount.should.equal(1)

    objCtx.writeIndirectObjectReference.callCount.should.equal(pageSize - numZeros)
    sinon.assert.calledWithExactly(objCtx.writeIndirectObjectReference.firstCall, linky)

    objCtx.endArray.callCount.should.equal(1)
  })
})
