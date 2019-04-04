module.exports = (objCtx, pageRef, [x1, y1, x2, y2]) => {
  const annotationObj = objCtx.startNewIndirectObject()
  const dictionaryContext = objCtx.startDictionary()

  dictionaryContext
    .writeKey('Type')
    .writeNameValue('Annot')
    .writeKey('Subtype')
    .writeNameValue('Link')
    .writeKey('Rect')
    .writeRectangleValue([x1, y1, x2, y2])
    .writeKey('Dest')

  objCtx.startArray()
  objCtx.writeIndirectObjectReference(pageRef)
  objCtx.writeName('XYZ')
  const c = objCtx.startFreeContext()
  c.write([ 32, 110, 117, 108, 108, 32, 110, 117, 108, 108, 32, 48, 32 ]) // " null null 0 "
  objCtx.endFreeContext()
  objCtx.endArray()
  objCtx.endLine()

  // remove annoying default border
  dictionaryContext.writeKey('Border')
  objCtx.startArray()
  objCtx.writeNumber(0)
  objCtx.writeNumber(0)
  objCtx.writeNumber(0)
  objCtx.endArray()
  objCtx.endLine()

  objCtx.endDictionary(dictionaryContext).endIndirectObject()

  return annotationObj
}
