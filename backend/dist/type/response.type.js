"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = void 0;
class Response {
    constructor(data, message) {
        this.statusCode = 200;
        this.message = message ?? ['SUCCESS'];
        this.data = data;
    }
}
exports.Response = Response;
//# sourceMappingURL=response.type.js.map