"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertMemberService = void 0;
const common_1 = require("@nestjs/common");
const response_type_1 = require("../type/response.type");
const users_entity_1 = require("../entity/user/users.entity");
const typeorm_1 = require("typeorm");
const sequence_entity_1 = require("../entity/user/sequence.entity");
const typeorm_2 = require("@nestjs/typeorm");
let InsertMemberService = class InsertMemberService {
    constructor(manager) {
        this.manager = manager;
    }
    async insertUser(body) {
        try {
            return await this.manager.transaction(async (transactionalEntityManager) => {
                const savedUser = await this.saveUser(transactionalEntityManager, body);
                return (0, response_type_1.generateResponse)([], ['登録が完了しました', '新規加入者番号:' + savedUser.id]);
            });
        }
        catch (e) {
            console.log(e);
            return (0, response_type_1.generateResponse)([], ['登録処理に失敗しました'], 400);
        }
    }
    async saveUser(entityManager, body) {
        const user = body;
        user.id = await this.generateUserID(entityManager);
        await entityManager.getRepository(users_entity_1.Users).insert(user);
        return Promise.resolve(user);
    }
    async getLastNum(entityManager) {
        const sequence = await entityManager
            .getRepository(sequence_entity_1.Sequence)
            .createQueryBuilder('sequence')
            .select('MAX(id)+1', 'id')
            .getRawOne();
        await entityManager.getRepository(sequence_entity_1.Sequence).insert(sequence);
        return Promise.resolve(sequence);
    }
    async generateUserID(entityManager) {
        const idNum = (await this.getLastNum(entityManager)).id;
        const strHeader = 'TS';
        return strHeader + this.zeroPadding(idNum, 4);
    }
    zeroPadding(num, digits) {
        let strNum;
        if (num == undefined) {
            strNum = '1';
        }
        else {
            strNum = num.toString();
        }
        while (strNum.length < digits) {
            strNum = '0' + strNum;
        }
        return strNum;
    }
};
exports.InsertMemberService = InsertMemberService;
exports.InsertMemberService = InsertMemberService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectEntityManager)()),
    __metadata("design:paramtypes", [typeorm_1.EntityManager])
], InsertMemberService);
//# sourceMappingURL=insert-member.service.js.map