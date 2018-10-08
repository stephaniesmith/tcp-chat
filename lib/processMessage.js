module.exports = function parseMessage(message) {
    if(message[0] !== '@') return null;

    let newMes = message.slice(1, message.length);

    const argIndex = message.indexOf(':');
    const textIndex = message.indexOf(' ');

    let msg = {
        command: '',
        arg: '',
        text: ''
    };

    if(argIndex !== -1) {
        msg.command = newMes.split(':')[0];
        msg.arg = textIndex !== -1 ? newMes.slice(argIndex, textIndex - 1) : newMes.split(':')[1];
        msg.text = textIndex !== -1 ? newMes.slice(textIndex, newMes.length) : '';
    } 
    else {
        msg.command = 'all';
        msg.arg = '';
        msg.text = newMes.slice(textIndex, newMes.length);
    }

    return msg;
};
