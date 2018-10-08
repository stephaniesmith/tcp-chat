const net = require('net');
const Clients = require('./clients');

const clients = new Clients();

module.exports = net.createServer(client => {
    client.setEncoding('utf8');
    clients.add(client);

    client.write(`Hello ${client.username}!`);

    client.on('end', () => {
        console.log(`${client.username} disconnected`);
        clients.remove(client);
    });

    client.on('error', err => {
        console.log(err);
        client.destroy;
    });

    client.on('data', () => {

        const message = `${client.username}: hello`;

        clients.getBroadcastClients(client)
            .forEach(c => c.write(message));
    });
});
