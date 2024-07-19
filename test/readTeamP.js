const axios = require('axios');
const { outPut } = require("../service/cLog");
const mysql = require("../service/db/mysql");

let access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiYWRtaW5Aa2xlLmNvbSJ9LCJpYXQiOjE3MDA0NDcwMzEsImV4cCI6MTcwMDQ1NzgzMX0.kmmdm0Drpbh67N1FDEZaI4sP3Rs1A86KYnYNhCmNSHA';

axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

const addToDB = async (address, balance) => {
    let sqlNameList = `update user_info set balance=${balance} where wallet_address ='${address}';`;
    let data2 = await mysql.query(sqlNameList);
    return 1;
}

const getTeamP = async (id, address) => {
    try {
        let p = await axios.get('http://localhost:8900/api/user/teamperformance?address=' + address);
        //outPut(`${id} : ${address} : ${p.data.balanceList}`);
        outPut(id);
        await addToDB(address, p.data.balanceList);
        return 1;
    } catch (error) {
        outPut(error)
    }
}

const getAllUser = async () => {
    let sqlNameList = `select id, wallet_address, balance from user_info where level >= 2 and enter_Level > 2`;

    let data2 = await mysql.query(sqlNameList);
    let jsonData2 = JSON.parse(JSON.stringify(data2));
    for(let i=0;i<jsonData2.length;i++){
        await getTeamP(jsonData2[i].id, jsonData2[i].wallet_address)
    }
    //outPut('finished all.')
}

getAllUser();

