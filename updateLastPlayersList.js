const mysql = require("../service/db/mysql");
const runCronJob = require("../service/runCronJob")
const sd = require('silly-datetime');
const ethers = require('ethers');
const pancakePair = require('../service/pancakePair')
const gamePlayer = require('../service/gamePlayer')
const klerMintNft = require('../service/klerMintNft')
var debug = require('debug')('http')
let cLog = require('../service/cLog')

const updateLastPlayersList = async () => {
    try {
        const playerList = await gamePlayer.getLastPlayersForGuaranteeRewardPool();
        //debug('last 100 list from contract : ', playerList.length);
        //cLog.outPut('last 100 player list from contract : ', playerList);
        let listArray = [];
        let n = playerList[0];
        if (playerList != 0) {
            listArray = playerList[1];
        }

        var sqls = [
            "delete from reward_records where reward_type = 'lastplayer'", // 删除 语句
        ];

        var params = [];

        for (var i = 0; i < n; i++) {
            let address = listArray[i][0];
            sqls.push(`INSERT INTO reward_records (wallet, reward_type, reward_amount) VALUES ('${address}', 'lastplayer', '0')`);
        }
        //debug('sqls : ', sqls)
        mysql
            .transaction(sqls, params)
            .then((arrResult) => {
                cLog.outPut('事物执行完毕')
                return 1;
            })
            .catch((err) => {
                cLog.outPut('mysql transaction err', err);
                return 0;
            });
    } catch (err) { debug('guaranteeReward', err); cLog.outPut('guaranteeReward', err); }
}

updateLastPlayersList()
