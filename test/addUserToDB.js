const axios = require('axios');
const cheerio = require('cheerio');  // 引入 cheerio 库，用于解析 HTML
const fs = require('fs')
const mysql = require("../service/db/mysql");
const { outPut } = require("../service/cLog");

const readTxt = async () => {
    let data = await fs.promises.readFile('refInfo2.txt', 'utf8');
    data = data.toString();
    const lines = data.split(/\r?\n/);

    var sqls = [];

    var params = [];

    for (var i = 0; i < lines.length; i++) {
        let a = lines[i];
        //outPut(lines[i])
        a = a.split(',');
        //outPut(a);
        let address = a[0];
        let referrer = a[1];
        sqls.push(`INSERT INTO user_info_aws (wallet_address, level, enter_Level, referrer, referrer_address, nft_status) VALUES ('${address}', '0', '0', '1', '${referrer}', '3')`);
    }

    mysql
        .transaction(sqls, params)
        .then((arrResult) => {
            outPut('事物执行完毕')
            return 1;
        })
        .catch((err) => {
            outPut('mysql transaction err', err);
            return 0;
        });

}

readTxt();

