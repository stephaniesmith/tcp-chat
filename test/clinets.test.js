const assert = require('assert');
const Clients = require('../lib/clients');

describe('Clinets', () => {

    const c1 = {};
    const c2 = {};
    const c3 = {};

    let clients = null;

    beforeEach(() => {
        clients = new Clients();
        clients.add(c1);
        clients.add(c2);
        clients.add(c3);
    });
    
    it('assings names', () => {
        assert.equal(c1.username, 'user1');
        assert.equal(c2.username, 'user2');
        assert.equal(c3.username, 'user3');
    });

    it('stores clients', () => {
        const allClients = clients.getAll();
        assert.deepEqual(allClients, [c1, c2, c3]);
    });

    it('gets a client', () => {
        const res = clients.get(c1.username);
        assert.deepEqual(res, c1);
    });

    it('removes a client', () => {
        clients.remove(c2);
        const allClients = clients.getAll();
        assert.deepEqual(allClients, [c1, c3]);
    });

    it('gives back list of clients (minus sender)', () => {
        const broadcast = clients.getBroadcastClients(c1);
        assert.deepEqual(broadcast, [c2, c3]);
    });

    it('renames a client', () => {
        const newName = clients.rename(c1, 'steph');
        assert.deepEqual(newName, { username: 'steph' });
    });
});
