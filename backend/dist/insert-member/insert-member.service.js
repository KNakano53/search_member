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
const users_entity_1 = require("../entity/user/users.entity");
const sequence_entity_1 = require("../entity/user/sequence.entity");
let InsertMemberService = class InsertMemberService {
    async insertUser(body, manager) {
        try {
            const savedUser = await this.saveUser(body, manager);
            return (0, response_type_1.generateResponse)([], ['登録が完了しました', '新規加入者番号:' + savedUser.id]);
        }
        catch (e) {
            console.log(e);
            return (0, response_type_1.generateResponse)([], ['登録処理に失敗しました'], 400);
        }
    }
    async saveUser(body, manager) {
        const user = body;
        user.id = await this.generateUserID(manager);
        return manager.getRepository(users_entity_1.Users).save(user);
    }
    async getLastNum(manager) {
        const sequence = await manager
            .getRepository(sequence_entity_1.Sequence)
            .createQueryBuilder('sequence')
            .select('MAX(id)+1', 'id')
            .getRawOne();
        return manager.getRepository(sequence_entity_1.Sequence).save(sequence);
    }
    async generateUserID(manager) {
        const idNum = (await this.getLastNum(manager)).id;
        const strHeader = 'TS';
        return strHeader + this.zeroPadding(idNum, 4);
    }
    zeroPadding(num, digits) {
        let strNum = num.toString();
        while (strNum.length < digits) {
            strNum = '0' + strNum;
        }
        return strNum;
    }
};
exports.InsertMemberService = InsertMemberService;
exports.InsertMemberService = InsertMemberService = __decorate([
    (0, common_1.Injectable)()
], InsertMemberService);
//# sourceMappingURL=insert-member.service.js.map