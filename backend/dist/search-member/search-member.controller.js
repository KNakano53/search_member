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
exports.SearchMemberController = void 0;
const common_1 = require("@nestjs/common");
const search_member_service_1 = require("./search-member.service");
const search_user_dto_1 = require("../entity/user/search.user.dto");
let SearchMemberController = class SearchMemberController {
    constructor(service) {
        this.service = service;
    }
    async searchMemberForPagination(page = 1, limit = 20, id = '', name = '', address = '', tel = '') {
        return await this.service.searchMember(new search_user_dto_1.SearchUserDTO(id, name, address, tel), {
            page,
            limit,
            route: 'http://localhost:3001/search-member',
        });
    }
};
exports.SearchMemberController = SearchMemberController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(20), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('id')),
    __param(3, (0, common_1.Query)('name')),
    __param(4, (0, common_1.Query)('address')),
    __param(5, (0, common_1.Query)('tel')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, String, String]),
    __metadata("design:returntype", Promise)
], SearchMemberController.prototype, "searchMemberForPagination", null);
exports.SearchMemberController = SearchMemberController = __decorate([
    (0, common_1.Controller)('search-member'),
    __metadata("design:paramtypes", [search_member_service_1.SearchMemberService])
], SearchMemberController);
//# sourceMappingURL=search-member.controller.js.map