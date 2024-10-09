const nzhcn = require('../cn');

console.log(nzhcn.decodeS('一万万万万亿', {outputString: false})); // 1e+24
console.log(nzhcn.decodeS('一万万万万亿', {outputString: true})); // "1000000000000000000000000"
console.log(nzhcn.toMoney("0.0"));