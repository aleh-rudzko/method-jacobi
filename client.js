var net = require('net');

module.exports = function(data, callback) {
    let client = new net.Socket();
    client.connect({port: 8080}, function() {
        console.log('connected to server!');
        client.write(data);
    });
    client.on('data', function(data) {
        console.log(data.toString());
        callback(data.toString());
        client.destroy();
    });
    client.on('close', function() {
        console.log('Connection closed');
    });
}


