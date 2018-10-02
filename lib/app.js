const net = require('net');

module.exports = net.createServer(client => {
    client.setEncoding('utf8');

    client.write('hello client!');
});
