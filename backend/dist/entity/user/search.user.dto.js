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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchUserDTO = void 0;
const class_validator_1 = require("class-validator");
class SearchUserDTO {
}
exports.SearchUserDTO = SearchUserDTO;
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.id != '' && o.id != undefined),
    (0, class_validator_1.IsString)({ message: '管理者番号は文字列で入力してください' }),
    (0, class_validator_1.MaxLength)(6, { message: '加入者番号は6文字以下で入力してください' }),
    __metadata("design:type", String)
], SearchUserDTO.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.name != '' && o.name != undefined),
    (0, class_validator_1.IsString)({ message: '氏名は文字列で入力してください' }),
    __metadata("design:type", String)
], SearchUserDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.address != '' && o.address != undefined),
    (0, class_validator_1.IsString)({ message: '住所は文字列で入力してください' }),
    __metadata("design:type", String)
], SearchUserDTO.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.tel != '' && o.tel != undefined),
    (0, class_validator_1.IsNumberString)(undefined, {
        message: '電話番号は半角数字で入力してください',
    }),
    (0, class_validator_1.MaxLength)(11, { message: '電話番号は11桁以内で入力してください' }),
    __metadata("design:type", String)
], SearchUserDTO.prototype, "tel", void 0);
//# sourceMappingURL=search.user.dto.js.map