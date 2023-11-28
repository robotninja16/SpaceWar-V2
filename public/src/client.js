const socket = io();

socket.on('connect', () => {
    console.log('Connected as ' + socket.id);
});

