var fs = require('fs');
var express = require('express');
var multer  = require('multer');
var progressStream = require('progress-stream');

var app = express();
var upload = multer({ dest: 'upload/' });

app.post('/upload', function (req, res, next) {
    // 创建progress stream的实例
    var progress = progressStream({length: '0'}); // 注意这里 length 设置为 '0'
    req.pipe(progress);
    progress.headers = req.headers;
	
    // 获取上传文件的真实长度（针对 multipart)
    progress.on('length', function nowIKnowMyLength (actualLength) {
    	console.log('actualLength: %s', actualLength);
    	progress.setLength(actualLength);
    });

	// 获取上传进度
    progress.on('progress', function (obj) {		
    	console.log('progress: %s', obj.percentage);
    });

    // 实际上传文件
    upload.single('file')(progress, res, next);
});

app.post('/upload', function (req, res, next) {
	res.send({ret_code: '0'});
});

app.get('/form', function(req, res, next){
    var form = fs.readFileSync('./form.html', {encoding: 'utf8'});
    res.send(form);
});

app.listen(3000);
