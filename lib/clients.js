module.exports = class Clients {
    constructor() {
        this.map = new Map();
        this.userNumber = 0;
    }

    add(client) {
        client.username = `user${++this.userNumber}`;
        this.map.set(client.username, client);
    }
};
