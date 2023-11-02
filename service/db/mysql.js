const mysql = require("mysql");
require('../../config/env')
let cLog = require('../cLog')

const pool = mysql.createPool({
    //host: "172.31.43.1",
    host: "192.168.109.101",
    user: "HcDB",
    password: "Huachang@999!",
    //host: "localhost",
    //user: "HcData",
    //password: "Huachang@456!",
    database: "hc_kly_db"
});

class Mysql {
    constructor() { }
    query(sql, callback) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err);
                    throw err;
                }
                connection.query(sql, function (error, results) {
                    if (error) {
                        reject(err);
                        throw error;
                    }
                    connection.release();
                    resolve(results);
                })
            })
        })
    }
    transaction(sqls, params) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                // 连接失败 promise直接返回失败
                if (err) {
                    return reject(err);
                }
                // 如果 语句和参数数量不匹配 promise直接返回失败
                // if (sqls.length !== params.length) {
                //     connection.release(); // 释放掉
                //     return reject(new Error("语句与传值不匹配"));
                // }
                // 开始执行事务
                connection.beginTransaction((beginErr) => {
                    // 创建事务失败
                    if (beginErr) {
                        connection.release();
                        return reject(beginErr);
                    }
                    cLog.outPut("开始执行事务，共执行" + sqls.length + "条语句");
                    // 返回一个promise 数组
                    let funcAry = sqls.map((sql, index) => {
                        return new Promise((sqlResolve, sqlReject) => {
                            const data = params[index];
                            connection.query(sql, data, (sqlErr, result) => {
                                if (sqlErr) {
                                    return sqlReject(sqlErr);
                                }
                                sqlResolve(result);
                            });
                        });
                    });
                    // 使用all 方法 对里面的每个promise执行的状态 检查
                    Promise.all(funcAry)
                        .then((arrResult) => {
                            // 若每个sql语句都执行成功了 才会走到这里 在这里需要提交事务，前面的sql执行才会生效
                            // 提交事务
                            connection.commit(function (commitErr, info) {
                                if (commitErr) {
                                    // 提交事务失败了
                                    cLog.outPut("提交事务失败:" + commitErr);
                                    // 事务回滚，之前运行的sql语句不生效
                                    connection.rollback(function (err) {
                                        if (err) cLog.outPut("回滚失败：" + err);
                                        connection.release();
                                    });
                                    // 返回promise失败状态
                                    return reject(commitErr);
                                }

                                connection.release();
                                // 事务成功 返回 每个sql运行的结果 是个数组结构
                                resolve(arrResult);
                            });
                        })
                        .catch((error) => {
                            // 多条sql语句执行中 其中有一条报错 直接回滚
                            connection.rollback(function () {
                                cLog.outPut("sql运行失败： " + error);
                                connection.release();
                                reject(error);
                            });
                        });
                });
            });
        });
    }
}

module.exports = new Mysql();