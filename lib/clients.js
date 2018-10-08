module.exports = class Clients {
    constructor() {
        this.map = new Map();
        this.userNumber = 0;
    }

    add(client) {
        client.username = `user${++this.userNumber}`;
        this.map.set(client.username, client);
    }

    getAll() {
        return [...this.map.values()];
    }

    remove(client) {
        this.map.delete(client.username);
    }

    getBroadcastClients(client) {
        return this.getAll().filter(c => c !== client);
    }

    rename(client, newName) {
        this.remove(client);
        client.username = newName;
        this.map.set(newName, client);
        return client;
    }

};
