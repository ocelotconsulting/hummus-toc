const path = require('path')
const createTOC = require('../')

const inputFile = path.join(__dirname, 'data', 'createWithBuffer.pdf')
const outputFile = path.join(__dirname, 'data', 'newout.pdf')
const outline = require(path.join(__dirname, 'data', 'outline.json'))

createTOC(inputFile, outputFile, outline)
