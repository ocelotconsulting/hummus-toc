# HummusJS Table of Contents (TOC) creator

This module was created to assist in the creation of TOC's for PDFs, based on a hierarchy of input.

## Purpose

When delivered PDF content or generated PDF content, sometimes the hierarchy for navigation is applied separately of the creation process. This module helps augment that original data with a logical hierarchy for navigating the document.

## Installation
`npm i --save @ocelot-consulting/hummus-toc`

## Usage

As seen in the [test file](./test/runOutline.js), once the module is loaded, it merely needs to have the parameters of the input file path, the output file path, and the hierarchy outline JSON.

```node
const path = require('path')
const createTOC = require('@ocelot-consulting/hummus-toc')

const inputFile = path.join(__dirname, 'data', 'existing.pdf')
const outputFile = path.join(__dirname, 'data', 'new.pdf')
const outline = require(path.join(__dirname, 'data', 'outline.json'))

createTOC(inputFile, outputFile, outline)
```

## Hierarchy/Outline Format

The top level of the outline is a JSON array, made up of elements having the following structure:

```JSON
[{
  "title": "Top Level",
  "page": 5,
  "children": [{
    "title": "Lower Level",
    "page": 4
  }]
}]
```

Of that, the `children` property in a given outline object is optional, but contains an array of hierarchy elements at the next sub-level.

## Credits

  - There is one free font included with the project, ["Monkey" by Tommy Ettinger](https://www.dafont.com/monkey.font). Wanted a monospaced font that looked interesting, and it fit the bill.

  - Huge shout out to the [HummusJS](https://github.com/galkahana/HummusJS) project and its maintainer [galkahana](https://github.com/galkahana). It took me awhile going back and forth between the project and the [PDF spec](https://www.adobe.com/content/dam/acom/en/devnet/pdf/pdfs/PDF32000_2008.pdf), but finally got the concepts nailed down. Also, the [sample PDF](./test/data/createWithBuffer.pdf) used in the tests comes from that project.

  - I was most of the way there on the code, but then ran into this issue [response](https://github.com/chunyenHuang/hummusRecipe/issues/21#issuecomment-445932577) that helped me get over the goal line. Thanks [Speedy37](https://github.com/Speedy37)!

  - Also leveraged relative hyperlink information from this [source](https://github.com/agentcooper/pdf-annotation-service/blob/master/pdf.js). Thanks [agentcooper](https://github.com/agentcooper)!
