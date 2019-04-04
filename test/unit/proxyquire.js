const pq = require('proxyquire').noCallThru()

module.exports = (...args) => pq(`../../${args[0]}`, ...args.slice(1))
