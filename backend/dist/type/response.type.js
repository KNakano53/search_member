"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResponse = void 0;
function generateResponse(data, message, statusCode) {
    statusCode ??= 200;
    message ??= [''];
    return { statusCode: statusCode, message: message, data: data };
}
exports.generateResponse = generateResponse;
//# sourceMappingURL=response.type.js.map