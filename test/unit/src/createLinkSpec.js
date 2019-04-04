const createLink = require('../../../src/createLink')
const assert = require('assert')

describe('createLink', () => {
  let objCtx, annoObj, dictCtx, writeKeyStub, freeCtx

  beforeEach(() => {
    annoObj = 'hello'
    freeCtx = {
      write: sinon.spy()
    }
    writeKeyStub = {
      writeKey: () => ({writeNameValue: () => ({writeKey: () => ({writeNameValue: () => ({writeKey: () => ({writeRectangleValue: () => ({writeKey: sinon.spy()})})})})})})
    }
    dictCtx = {
      ...writeKeyStub,
      writeNameValue: sinon.spy()
    }
    objCtx = {
      startNewIndirectObject: sinon.stub().returns(annoObj),
      startDictionary: sinon.stub().returns(dictCtx),
      endDictionary: () => ({endIndirectObject: sinon.spy()}),
      startArray: sinon.spy(),
      endArray: sinon.spy(),
      writeIndirectObjectReference: sinon.spy(),
      writeName: sinon.spy(),
      writeNumber: sinon.spy(),
      startFreeContext: sinon.stub().returns(freeCtx),
      endFreeContext: sinon.spy(),
      endLine: sinon.spy()
    }
  })

  it('annotation equals what we thought', async () => {
    const newLink = createLink(objCtx, 1, [1, 2, 3, 4])
    assert.strictEqual(annoObj, newLink)
  })
})
