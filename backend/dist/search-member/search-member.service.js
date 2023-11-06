"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchMemberService = void 0;
const common_1 = require("@nestjs/common");
const response_type_1 = require("../response.type");
const user_model_1 = require("../entity/user-model/user-model");
let SearchMemberService = class SearchMemberService {
    searchMember(body) {
        if (this.getFindAllFlag(body)) {
            return this.findAll();
        }
        else {
            return this.findByAddress();
        }
    }
    findAll() {
        const users = [
            (0, user_model_1.generateUser)('TS1234', '田中 太郎', '愛知県', '012-345-678'),
            (0, user_model_1.generateUser)('TS2234', '藤本 亮介', '千葉県', '012-345-678'),
            (0, user_model_1.generateUser)('TS3234', '伊織 順平', '東京都', '012-345-678'),
            (0, user_model_1.generateUser)('TS4234', '里中 千枝', '長野県', '012-345-678'),
            (0, user_model_1.generateUser)('TS5234', '雨宮 蓮', '東京都', '012-345-678'),
        ];
        const response = new response_type_1.Response(users);
        return response;
    }
    findByAddress() {
        const users = [
            (0, user_model_1.generateUser)('TS3234', '伊織 順平', '東京都', '012-345-678'),
            (0, user_model_1.generateUser)('TS5234', '雨宮 蓮', '東京都', '012-345-678'),
        ];
        const response = new response_type_1.Response(users, '検索処理でエラーが発生しました');
        return response;
    }
    getFindAllFlag(body) {
        if ('' == body.id &&
            '' == body.name &&
            '' == body.address &&
            '' == body.tel) {
            return true;
        }
        return false;
    }
};
exports.SearchMemberService = SearchMemberService;
exports.SearchMemberService = SearchMemberService = __decorate([
    (0, common_1.Injectable)()
], SearchMemberService);
//# sourceMappingURL=search-member.service.js.map