const Event = require('events');

var url = "http://mylogger.io/log";

class Logger extends Event {
    log(message) {
        // Send an HTTP request
        console.log(message);
    
        this.emit('messageLogged', {id: 1, url: 'http://'});
        
    }
}

module.exports = Logger;
