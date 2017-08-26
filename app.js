const http = require('http'),
    fs = require('fs'),
    path = require('path'),
    utils = require('./utils');


const server = http.createServer((req, res )=> {
    let file = req.url.slice(1);
    if (file === '') file = 'index.html';

    file = path.join(__dirname,'static',file);

    console.log('req:' + req.url);
    fs.stat(file, (err, stats) => {
        if (!stats ){
            res.statusCode = 404;
            res.statusMessage = 'Not found: ' + req.url;
            res.end(res.statusMessage);
            return;
        }

        var mime = utils.mimeFromFileName(file);

        fs.readFile(file, (err, content) =>{
            res.setHeader('Content-Type',mime);
            if (mime.indexOf('text') >= 0){
                var html = content.toString('utf-8');
                html = html.replace('{{timestamp}}',new Date().toLocaleString())
                            .replace('{{ip}}',utils.getIp());
                res.end(html);
            }else {
                res.end(content,'binary');
            }
        });   
    });
});

server.listen(3000);

