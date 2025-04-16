"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const manager_1 = __importDefault(require("./store/manager"));
const router = (0, express_1.Router)();
const manager = new manager_1.default();
router.post("/addUser", (req, res) => {
    const data = req.body;
    console.log(data);
    manager.initRoom(data.room, { name: data.name });
    res.json({ message: "done", roomID: manager.roomID });
});
router.post("/chat", (req, res) => {
    const chat = req.body;
    manager.sendMessage(chat.message);
    res.json({ message: "chat " });
});
exports.default = router;
