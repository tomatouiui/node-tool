const axios = require('axios');
const cheerio = require('cheerio');  // 引入 cheerio 库，用于解析 HTML
const fs = require('fs')

const getHtml = async (hashTxt, i) => {
    try {
        const response = await axios.get('https://bscscan.com/tx/' + hashTxt); // 替换为你想要解析的网页 URL
        const html = response.data;  // 获取响应中的 HTML 内容

        const $ = cheerio.load(html);  // 将 HTML 文本传递给 cheerio，创建一个类似于 jQuery 的对象

        // 使用 cheerio 对象的选择器来获取网页标题，并提取文本内容
        let refInfo = $('#inputdata').val();
        //refInfo = refInfo.replaceAll(/Function: refer(address user, address referrer) ***/ig,"");
        const opt = {
            flag: 'a', // a：追加写入；w：覆盖写入
        }
        if (refInfo) {
            fs.writeFile('refInfo.txt', refInfo + '\n', opt, (err) => {
                if (err) {
                    //console.error(err)
                }
                console.log(i + ' ok.');
            })
        }else{
            let refInfo = i + ' err.==============>>>';
            fs.writeFile('refInfo.txt', refInfo + '\n', opt, (err) => {
                if (err) {
                    //console.error(err)
                }
                console.log(i + ' ok.');
            })
        }
    } catch (error) {
        console.error(i + ' err.===========================>');
    }
}

const readTxt = async () => {
    let data = await fs.promises.readFile('chain.txt', 'utf8');
    data = data.toString();
    const lines = data.split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
       await getHtml(lines[i], i);
    }
    console.log('finished all.')
}

readTxt();

