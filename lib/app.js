const net = require('net');
const Clients = require('./clients');
const parseMessage = require('./processMessage');


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

    client.on('data', data => {

        const { command, arg, text } = parseMessage(data);

        switch(command) {
            case 'all': 
                clients.getBroadcastClients(client)
                    .forEach(c => c.write(`${client.username}: ${text}`));
                break;
            case 'dm':
                clients.get(arg)
                    .write(`${client.username}: ${text}`);
                break;
            case 'nick':
                clients.rename(client, arg);
                client.write(`Your new username is ${client.username}`);
                break;
            default:
                client.write('Unknown command');
                break;
        }

    });
});
