let express = require ('express');
let http = require ('http');
let io = require ('socket.io');

let app = express();
let server = http.createServer(app);
io = new io.Server(server);

app.use('/', express.static('public'));

//sockets
io.sockets.on('connection', (socket) => {
    console.log("We have a new client: ", socket.id);
    socket.on('disconnect', () => {
        console.log("socket has been disconnected: ", socket.id);
    })

    socket.on('mousePositionData', (data) => {
        console.log(data);
        io.sockets.emit('mouseDataFromServer', data);
    })
})

//server listening on port
server.listen(8800, () => {
    console.log("server is up and running")
})
