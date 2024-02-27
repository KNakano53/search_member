"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResponse = void 0;
function generateResponse(data, message, status) {
    status ??= 200;
    message ??= [''];
    return { status: status, message: message, data: data };
}
exports.generateResponse = generateResponse;
//# sourceMappingURL=response.type.js.map