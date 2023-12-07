1. 安装阿帕奇

sudo apt update
sudo apt install apache2

Start Apache 2 Server /启动apache服务
$ sudo /etc/init.d/apache2 start


Restart Apache 2 Server /重启apache服务
$ sudo /etc/init.d/apache2 restart


Stop Apache 2 Server /停止apache服务
$ sudo /etc/init.d/apache2 stop

//
$ sudo apt-get --purge remove  apache2 

修改端口号

1、修改配置文件

（1）修改 /etc/apache2/ports.conf 将

Listen 80 改成

（2）修改/etc/apache2/config.......
ports.conf 里面有提示


（3）重启apache
sudo /etc/init.d/apache2 restart
端口修改完毕。apache的端口修改为9000了。

=====================================

2. 安装数据库

1 安装数据库
sudo apt install mysql-server

2 sudo su 提升权限进入数据库
sudo mysql 登陆mysql服务

3 修改root登陆方式
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'huachang@123';

4 修改登陆方式为密码方式登陆
mysql -u root -p

5 创建新用户
//CREATE USER 'HcData'@'localhost' IDENTIFIED BY 'Huachang@456!';
CREATE USER 'HcData'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Huachang@456!';

CREATE USER 'HcDB'@'%' IDENTIFIED WITH mysql_native_password BY 'Huachang@999!';

6 分配权限
// GRANT ALL PRIVILEGES ON *.* TO 'HcData'@'localhost' WITH GRANT OPTION;

GRANT ALL PRIVILEGES ON `hc_kly_db`.* TO 'HcData'@'localhost' WITH GRANT OPTION;

GRANT ALL PRIVILEGES ON `hc_kly_db`.* TO 'HcDB'@'%' WITH GRANT OPTION;

//GRANT PROCESS ON *.* TO 'HcData'@'localhost';

7 
ALTER USER 'HcData'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Huachang@456!';

8 
//update mysql.user set host = 'localhost' where user = 'HcData';

select user,host from mysql.user;

flush privileges;

//GRANT ALL PRIVILEGES ON *.* TO 'userName' @ 'IPAddress' IDENTIFIED BY 'userPw' WITH GRANT OPTION;

//修改本地mysql配置文件, 把bind-address=127.0.0.1，注释掉
9 vim /etc/mysql/mysql.conf.d/mysqld.cnf

//
create database hc_kly_db;

use hc_kly_db;

source /root/work/hc_kly_db_live_2023-10-19_14_30.sql

source /home/zxc/hc_kly_db_tt.sql

source /home/zxc/Downloads/hc_kly_db_ali_1007_0928.sql

source /root/kleinSwap/KleinSwapBackend/test/hc_kly_db_live10291213.sql

update set remark = '' from system_info where status_name = 'adminToken'  

//export db
mysqldump hc_kly_db > autoBackUp/hc_kly_db_tt.sql -u root -p

mysqldump hc_kly_db > work/hc_kly_db_ali_1011.sql -u root -p

mysqldump hc_kly_db > autoBackUp/hc_kly_db_local_1011.sql -u root -p


//查看用户权限
SHOW GRANTS FOR 'HcDB'@'%';

//删除用户
drop user XXX;
drop user HcDB



 Debian / Ubuntu Linux

1.启动：/etc/init.d/mysql start

2.停止：/etc/init.d/mysql stop

3.重启：/etc/init.d/mysql restart

==============================================================================

删除node
sudo apt remove nodejs
sudo apt remove npm
sudo apt autoremove

安装node

sudo apt install git curl

curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs


==============================================================================

sudo mv kleApp /usr/local/bin

cd /usr/local/bin
sudo rm -r kleApp

=============================================================================
clear db

DELETE FROM transactions;
DELETE FROM static_reward_records;
DELETE FROM reward_records;
DELETE FROM big_reward_records;
DELETE FROM guarantee_reward_records;
DELETE FROM nfts_info where nfts_type = 'out';
DELETE FROM reserve_info;

update system_info set status_value = 0 where status_name = 'swapStatus';
update system_info set status_value = 3 where status_name = 'openLevel';
update system_info set status_value = 0, remark = '' where status_name = 'LastTradingTimeReward';
update system_info set status_value = 720 where status_name = 'lastTradingTimeCountdown';
update system_info set remark = 3000 where status_name = 'NodeRewardGenesisPercentage';
update system_info set remark = 7000 where status_name = 'NodeRewardEcologyPercentage';
update system_info set remark = 0 where status_name = 'NodeRewardProjectPercentage';
update system_info set remark = '4000,2000,1000,800,700,300,300,300,300,300' where status_name = 'bigRewardno';
update system_info set remark = '100,400,200,250,50,0' where status_name = 'usdtReceiver';
update system_info set remark = '500,300,1500,0,200' where status_name = 'klnReceiver';
update system_info set remark = '50' where status_name = 'priceLimitPercent';
update system_info set remark = '0 0-23/8' where status_name = 'smallPrizesTime';
update system_info set remark = '' where status_name = 'adminToken';
update system_info set remark = '0' where status_name = 'robotStatus';
update system_info set remark = '*/5' where status_name = 'robotRunTime';
update system_info set remark = '0xc4a776e368575250A216dF904cCD665731C56774,0xCe19c123Fdc90F8035D37b27931F20C27947F2Da,0xD820ce6c2856aa41fFdC43C80b94a7791BD23252,0x3F661b7A6D546a07f5E078Dd34A51fABBD9A7277' where status_name = 'reserverList';
update system_info set remark = '0' where status_name = 'transactionSwitch';
update user_info set level = 0, enter_Level = 0;

update nfts_info set wallet = '';
DELETE FROM user_info;


=====================================================================

reserverList
0x2546BcD3c84621e976D8185a91A922aE77ECEc30,0xbDA5747bFD65F08deb54cb465eB87D40e51B197E,0xdD2FD4581271e230360230F9337D5c0430Bf44C0,0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199

===================================================================
//install pm2
npm install -g pm2

pm2 list：显示所有进程信息；
pm2 restart 11：重启id为 11 的进程；
pm2 logs 11：显示进程id为 11 的日志；

pm2 install pm2-logrotate
pm2 set pm2-logrotate:retain 7

//db new name
payeeWallet
===============================================================

select
(select sum(amount_KLN) from transactions where Buy_sell = 0 and wallet_address = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8') as buy,
(select sum(amount_KLN) from transactions where Buy_sell = 1 and wallet_address = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8') as sel, 
ifnull((select sum(amount_KLN) from transactions where Buy_sell = 0 and wallet_address = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'),0) - 
ifnull((select sum(amount_KLN) from transactions where Buy_sell = 1 and wallet_address = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'),0) as res 
from transactions limit 1

=============================================================
docker

sudo docker build -t kle/app:1.0 .

========================================================
数据库更新两个表：
1 nftStandard 5000
2 nftStandardNo 50

3 用户表，加一列 nft_status  默认值 0 

===================================================================

docker

sudo docker build -t kle/backend:0.5 . 

sudo docker build -t kle_backend_pm2 .

sudo docker build -t kle_backend_pm2_runtime .  

sudo docker images list

//sudo docker run -p 8900:8900 kle/backend:0.5

//sudo docker run -d -p 8900:8900 kle_backend_pm2

sudo docker run -d -p 8900:8900 kle_backend_pm2_runtime

sudo docker run --name backend_pm2_v2 -dit -p 8900:8900 kle_backend_pm2_runtime /bin/bash

终端交互式
sudo docker run -it -p 8900:8900 kle/backend:0.5 /app



运行image
sudo docker run --name klebackend -p 8081:8900 kle-app:0.2 

删除image
docker image rm centos:latest
sudo docker image rm 1daeaa496d2a

停止容器
sudo docker container stop centos:latest
sudo docker container stop 57e468f92cf5

重启容器
docker container restart 27f65fac98dd

删除容器
sudo docker container rm centos:latest
sudo docker container rm fdbe6078892d

查看所有的容器命令如下：
docker ps -a

创建compose
sudo docker-compose -f docker-compose.yml build

sudo docker-compose -f docker-compose.yml up

进入容器
docker exec -it backend_pm2 /bin/bash

docker exec -it backend_pm2_v2 /bin/bash

docker exec -it 5761cf583d95 /bin/bash

====================================================

//pull mysql 镜像
docker pull mysql

//运行mysql image
docker run --name mysql_c -dit -p 3306:3306 mysql /bin/bash

docker run --name mysql_c -e mysql_root_password=1234 -dit -p 3306:3306 mysql /bin/bash

//运行mysql 客户端
docker run -it mysql /bin/bash

//查看docker信息
docker inspect mysql_c

==============================
//查看本地开放端口
netstat -tuln

sudo netstat -tunlp

=======================================
//查看本地硬盘
df -h

===============================================

安装node

sudo apt install git curl

curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

====================================================

备份好配置文件nginx后，用vi编辑器打开etc/conf目录下的nginx.conf，对配置文件进行修改，模板如下（建议直接拷贝）
在这个文件夹下
cd /etc/nginx/conf.d/


location ^~ /monoply-api/ {
		proxy_pass       http://127.0.0.1:8900;
		proxy_set_header Host      $host;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_read_timeout 300; //超时设置
   }

sudo nginx -t //测试配置文件是否正确
sudo systemctl restart nginx
=========================================================
Ubuntu time
1 查看当前时间状态
timedatectl status

2 修改时区
timedatectl set-timezone "Asia/Shanghai"

=====================================================

mysql timezone
1 查看时区：
SELECT TIMEDIFF(NOW(), UTC_TIMESTAMP);

查看 MySQL 当前时间、当前时区：
select curtime();
show variables like "%time_zone%";

2 修改时区：
set global time_zone = '+8:00';
# 修改MySQL全局时区为北京时间，即我们所在的东8区

set time_zone = '+8:00';
# 修改当前会话时区

flush privileges;
# 立即生效

=======================================================
修改文件夹名
sudo mv former_name/ new_name/

============================================
vim .env
vim service/db/mysql.js
vim autoBackUp/runjob.txt

铸币脚本，后面空格跟钱包地址
js内部需要确认 user_type and WalletList
node test/genMintnft.js


