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
exports.InsertMemberController = void 0;
const common_1 = require("@nestjs/common");
const insert_user_dto_1 = require("../entity/user/insert.user.dto");
const insert_member_service_1 = require("./insert-member.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let InsertMemberController = class InsertMemberController {
    constructor(service, manager) {
        this.service = service;
        this.manager = manager;
    }
    async insertUser(body) {
        return await this.manager.transaction(async (manager) => {
            return await this.service.insertUser(body, manager);
        });
    }
};
exports.InsertMemberController = InsertMemberController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [insert_user_dto_1.InsertUserDTO]),
    __metadata("design:returntype", Promise)
], InsertMemberController.prototype, "insertUser", null);
exports.InsertMemberController = InsertMemberController = __decorate([
    (0, common_1.Controller)('insert-member'),
    __param(1, (0, typeorm_1.InjectEntityManager)()),
    __metadata("design:paramtypes", [insert_member_service_1.InsertMemberService,
        typeorm_2.EntityManager])
], InsertMemberController);
//# sourceMappingURL=insert-member.controller.js.map