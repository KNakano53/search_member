"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertMemberService = void 0;
const common_1 = require("@nestjs/common");
const response_type_1 = require("../type/response.type");
const _ = require("lodash");
let InsertMemberService = class InsertMemberService {
    async insertUser(body) {
        if (!_.isEmpty(body.name)) {
            return new response_type_1.Response([], ['登録が完了しました', '新規加入者番号:TS0101']);
        }
        else {
            return new response_type_1.Response([], ['登録に失敗しました']);
        }
    }
};
exports.InsertMemberService = InsertMemberService;
exports.InsertMemberService = InsertMemberService = __decorate([
    (0, common_1.Injectable)()
], InsertMemberService);
//# sourceMappingURL=insert-member.service.js.map