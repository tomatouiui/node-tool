const mysql = require("../service/db/mysql");
require("../config/env")
let { outPut } = require('../service/cLog')
const linkJson = require('./availableNetwork.json')

exports.getLink = async () => {
    try {
        let link = '';
        const sql = `select * from system_info where status_name = 'linksIndex'`;
        const data = await mysql.query(sql);
        let jsonData = JSON.parse(JSON.stringify(data));
        outPut(jsonData[0].status_value)
        link = linkJson[jsonData[0].status_value]
        outPut(link)
        let sql2 = `update system_info set status_value = status_value + 1 where status_name = 'linksIndex'`;
        outPut(linkJson.length - 1)
        if (linkJson.length - 1 <= jsonData[0].status_value) {
            sql2 = `update system_info set status_value = 0 where status_name = 'linksIndex'`;
        }

        await mysql.query(sql2);

        return link;
    } catch (err) {
        outPut('getLink : ', err)
        return 'https://rpc.ankr.com/bsc/';
    }
}

this.getLink();
