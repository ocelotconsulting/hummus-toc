const translatePageNumbers = (parser, outline, offset = 0) =>
  outline.children
    ? {
      ...outline,
      page: parser.getPageObjectID(outline.page + offset),
      children: outline.children.map(childOutline => translatePageNumbers(parser, childOutline, offset))
    }
    : {
      ...outline,
      page: parser.getPageObjectID(outline.page + offset)
    }

module.exports = translatePageNumbers
