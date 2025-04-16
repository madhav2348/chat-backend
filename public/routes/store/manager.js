"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Manage {
    constructor() {
        this.storage = new Map();
        this.roomName = ""; // single quotes only , dont mess up
        this.roomID = "";
    }
    initRoom(roomName, user) {
        this.storage.set(roomName, { roomName: roomName, id: (0, uuid_1.v1)(), chat: [] });
        this.id = (0, uuid_1.v1)();
        this.roomName = roomName;
        this.name = user === null || user === void 0 ? void 0 : user.name;
        this.roomID = this.storage.get(this.roomName).id;
    }
    // addUsers( user: User) {
    //   this.id = user.id;
    //   this.name = user.name;
    // }
    sendMessage(message) {
        const room = this.storage.get(this.roomName);
        if (!room) {
            return;
        }
        const chats = {
            id: (0, uuid_1.v1)(),
            message: message,
            createAt: Date.now().toString(),
            userId: this.id,
        };
        this.storage.set(this.roomName, {
            id: room.id,
            chat: [...room.chat, chats],
            roomName: room.roomName,
        });
    }
}
exports.default = Manage;
