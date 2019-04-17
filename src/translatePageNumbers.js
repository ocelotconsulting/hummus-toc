const translatePageNumbers = (parser, outline, offset = 0) =>
  outline.children
    ? {
      ...outline,
      page: outline.page ? parser.getPageObjectID(outline.page + offset) : undefined,
      children: outline.children.map(childOutline => translatePageNumbers(parser, childOutline, offset))
    }
    : {
      ...outline,
      page: outline.page ? parser.getPageObjectID(outline.page + offset) : undefined
    }

module.exports = translatePageNumbers
