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
exports.InsertUserDTO = void 0;
const class_validator_1 = require("class-validator");
class InsertUserDTO {
}
exports.InsertUserDTO = InsertUserDTO;
__decorate([
    (0, class_validator_1.IsEmpty)(),
    __metadata("design:type", String)
], InsertUserDTO.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '氏名は必須です' }),
    (0, class_validator_1.IsString)({ message: '氏名は文字列で入力してください' }),
    (0, class_validator_1.MaxLength)(127, { message: '氏名は127文字以内で入力してください' }),
    __metadata("design:type", String)
], InsertUserDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '住所は必須です' }),
    (0, class_validator_1.IsString)({ message: '住所は文字列で入力してください' }),
    (0, class_validator_1.MaxLength)(127, { message: '住所は127文字以内で入力してください' }),
    __metadata("design:type", String)
], InsertUserDTO.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '電話番号は必須です' }),
    (0, class_validator_1.IsNumberString)(undefined, {
        message: '電話番号は半角数字で入力してください',
    }),
    (0, class_validator_1.MaxLength)(11, { message: '電話番号は11桁以内で入力してください' }),
    __metadata("design:type", String)
], InsertUserDTO.prototype, "tel", void 0);
//# sourceMappingURL=insert.user.dto.js.map