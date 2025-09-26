const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public')); // Folder untuk file HTML, CSS, JS

io.on('connection', (socket) => {
    console.log('Pengguna terhubung');
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // Kirim pesan ke semua klien
    });
    socket.on('disconnect', () => {
        console.log('Pengguna terputus');
    });
});

server.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});

