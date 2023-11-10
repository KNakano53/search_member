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
exports.SearchMemberService = void 0;
const common_1 = require("@nestjs/common");
const response_type_1 = require("../type/response.type");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_entity_1 = require("../entity/user/users.entity");
let SearchMemberService = class SearchMemberService {
    constructor(repository) {
        this.repository = repository;
    }
    async searchMember(body) {
        const conditions = this.createWhereConditions(body);
        return this.findByParam(conditions);
    }
    async findByParam(conditions) {
        try {
            const users = await this.repository.find({
                where: conditions,
                order: {
                    id: 'asc',
                },
            });
            const response = new response_type_1.Response(users);
            return response;
        }
        catch (e) {
            console.log(e);
            const response = new response_type_1.Response([], '検索処理でエラーが発生しました');
            return response;
        }
    }
    createWhereConditions(body) {
        const conditions = {};
        if (body.id !== '') {
            conditions.id = body.id;
        }
        if (body.name !== '') {
            conditions.name = (0, typeorm_2.Like)('%' + body.name + '%');
        }
        if (body.address !== '') {
            conditions.address = (0, typeorm_2.Like)('%' + body.address + '%');
        }
        if (body.tel !== '') {
            conditions.tel = body.tel;
        }
        return conditions;
    }
};
exports.SearchMemberService = SearchMemberService;
exports.SearchMemberService = SearchMemberService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SearchMemberService);
//# sourceMappingURL=search-member.service.js.map