"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const uuid_1 = require("uuid");
const page_1 = __importDefault(require("./routes/page"));
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: '*',
    },
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(page_1.default);
io.on('connection', (socket) => {
    const { roomId, userId } = socket.handshake.query;
    if (typeof roomId === 'string') {
        socket.join(roomId);
    }
    socket.on('message', (data) => {
        const fullMessage = {
            id: (0, uuid_1.v4)(),
            text: data.text,
            sender: data.sender,
            timestamp: data.timestamp || new Date().toISOString(),
        };
        if (typeof roomId === 'string') {
            io.to(roomId).emit('message', fullMessage);
        }
    });
    socket.on('disconnect', () => {
        console.log(`User ${userId} disconnected`);
    });
});
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
    console.log(`Socket.IO server running on port ${PORT}`);
});
