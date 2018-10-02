const net = require('net');
const Clients = require('./clients');

const clients = new Clients();

module.exports = net.createServer(client => {
    client.setEncoding('utf8');
    clients.add(client);

    client.write('hello client!');

    client.on('end', () => clients.remove(client));

    client.on('data', () => {

        const message = `${client.username}: hello`;

        clients.getBroadcastClients(client)
            .forEach(c => c.write(message));
    });
});
