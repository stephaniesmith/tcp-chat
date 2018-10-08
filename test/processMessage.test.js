const assert = require('assert');
const parseMessage = require('../lib/processMessage');

describe('Process Message', () => {
    it('returns null if it does not start with @', () => {
        const msg = 'some message';
        const res = parseMessage(msg);
        assert.equal(res, null);
    });

    it('returns on object form a string on dm', () => {
        const msg = '@dm:steve some text';
        const res = parseMessage(msg);
        assert.deepEqual(res, { command: 'dm', arg: 'steve', text: 'some text' });
    });
    
    it('returns on object form a string on nick', () => {
        const msg = '@nick:steve';
        const res = parseMessage(msg);
        assert.deepEqual(res, { command: 'nick', arg: 'steve', text: '' });
    });

    it('returns on object form a string on all', () => {
        const msg = '@all hello there';
        const res = parseMessage(msg);
        assert.deepEqual(res, { command: 'all', arg: '', text: 'hello there' });
    });
});
