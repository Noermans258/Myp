const socket = io();
function sendMessage() {
    const input = document.getElementById('message-input');
    if (input.value.trim()) {
        socket.emit('chat message', input.value);
        input.value = '';
    }
}
socket.on('chat message', (msg) => {
    const chatMessages = document.getElementById('chat-messages');
    const message = document.createElement('div');
    message.textContent = msg;
    message.style.background = '#DCF8C6';
    message.style.padding = '10px';
    message.style.margin = '5px';
    message.style.borderRadius = '10px';
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

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
// Inisialisasi Firebase di script.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, onSnapshot } from 'firebase/firestore';

const firebaseConfig = {
    // Konfigurasi Firebase Anda
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Simpan pesan
async function sendMessage() {
    const input = document.getElementById('message-input');
    if (input.value.trim()) {
        await addDoc(collection(db, 'messages'), {
            text: input.value,
            timestamp: new Date(),
            sender: 'user-id' // Ganti dengan ID pengguna
        });
        input.value = '';
    }
}

// Dengarkan pesan baru
onSnapshot(collection(db, 'messages'), (snapshot) => {
    const chatMessages = document.getElementById('chat-messages');
    snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
            const message = document.createElement('div');
            message.textContent = change.doc.data().text;
            message.style.background = '#DCF8C6';
            message.style.padding = '10px';
            message.style.margin = '5px';
            message.style.borderRadius = '10px';
            chatMessages.appendChild(message);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    });
});
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

// Registrasi
function register(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('Pengguna terdaftar:', userCredential.user);
        })
        .catch((error) => {
            console.error('Error:', error.message);
        });
}

// Login
function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('Pengguna login:', userCredential.user);
        })
        .catch((error) => {
            console.error('Error:', error.message);
        });
}
