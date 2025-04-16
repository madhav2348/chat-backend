"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Download {
    constructor() {
        this.data = '';
    }
    setDownload(data) {
        this.data = data;
        localStorage.setItem(data, `chat-at-${Date.now().toString()}.json`);
    }
    import() {
    }
    export() {
    }
}
