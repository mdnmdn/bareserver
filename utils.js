const os = require('os'),
    path = require('path');

const getIp = function(){

    let ips = [];
    const interfaces = os.networkInterfaces();

    Object.keys(interfaces)
        .forEach(intf => interfaces[intf]
            .filter(addr => addr.family === 'IPv4' && !addr.internal) 
            .forEach(addr => ips.push(addr.address)));

    return ips.join(', ');
};

const mimeTypes = {
    'html': 'text/html;',
    'txt' : 'text/plain;',
    'css' : 'text/css;',
    'js'  : 'application/javascript;',
    'png' : 'image/png;',
    'gif' : 'image/gif;',
    'jpeg': 'image/jpg;',
    'jpg' : 'image/jpg;',
    'ico' : 'image/x-icon;'
};

const mimeFromFileName = function (fileName){
    const extension = path.extname(fileName).toLowerCase().slice(1);
    let mime = mimeTypes[extension];
    if (!mime) mime = 'application/octect-stream';
    return mime;
}

module.exports = { getIp, mimeTypes, mimeFromFileName};