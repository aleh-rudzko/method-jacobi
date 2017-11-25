const net = require('net');
const Jacobi = require('./jacobi');

let server = net.createServer(function(connection) {
   console.log('client connected');
   
   connection.on('end', function() {
       console.log('client disconnected');
   });
   connection.on('close', function() {
       console.log('connection closed');
   });
   connection.on('data', function(dataJson) {
        let data = JSON.parse(dataJson.toString());
        result = Jacobi(data.matrixA, data.vectorB);
        console.log(result);  
        connection.write(JSON.stringify(result));
   });
});
server.listen(8080, function() { 
   console.log('server is listening');
});