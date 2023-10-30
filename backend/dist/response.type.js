"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = void 0;
class Response {
    constructor(data) {
        this.statusCode = 200;
        this.message = 'SUCCESS';
        this.data = JSON.stringify(data);
    }
}
exports.Response = Response;
//# sourceMappingURL=response.type.js.map