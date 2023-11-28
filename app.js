process.on('warning', (warning) => console.log(warning));

const express = require('express'),
    app = express(),
    http = require('http'),
    cors = require('cors'),
    server = require('socket.io'),
    game = require('./game.js'),
    Player = require('./player.js');


app.use(cors());
app.use(express.static('public'));
app.use((req, res, next) => {
    res.header("x-content-type-options", "nosniff");
    next();
});

const httpServer = http.createServer(app),
    io = server(httpServer, {
        connectionStateRecovery: {
            // (1 minute) 60 sec * 1000 ms
            maxDisconnectionDuration: 60 * 1000
        }
    });

io.on('connect', (socket) => {
    new Player(socket);
});

httpServer.listen(8000, '192.168.254.141', undefined, () => {
    address = httpServer.address();
    console.log(`Server: ${address.address} Port: ${address.port} Family: ${address.family}`);
});