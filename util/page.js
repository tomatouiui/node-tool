let md5 = require('./md5')
var args = process.argv.splice(2)

let pk = args[0];
let pk1 = pk.substring(0,10);
let pk2 = pk.substring(10,pk.length);
pk1 = md5.encrypt(pk1);
//console.log(args[0]);
//console.log(pk1);
console.log(pk2+','+pk1);
