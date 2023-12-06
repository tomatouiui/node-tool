require("../config/env")
let { dencrypt } = require('./md5')
const fs = require('fs/promises');
var debug = require('debug')('service')
var path = require('path');

const wait = (ms) => {
    return new Promise(resolve => setTimeout(() => resolve(), ms));
};

const all = async() => {
    const data = await fs.readFile(path.join(__dirname, '../autoBackUp/runjob.txt'), { encoding: 'utf8' });
    //debug('data', data);
    let a = data.split(',');
    let all = dencrypt(a[1]) + a[0];
    //let all = dencrypt(process.env.P_H) + str;
    //debug('all return : ', all)
    return all;
}

module.exports = {
    wait,
    all
}