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
exports.FindAllController = void 0;
const common_1 = require("@nestjs/common");
const find_all_service_1 = require("./find-all.service");
let FindAllController = class FindAllController {
    constructor(findAllService) {
        this.findAllService = findAllService;
    }
    findAll() {
        const result = this.findAllService.findAll();
        console.log(result);
        return result;
    }
};
exports.FindAllController = FindAllController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FindAllController.prototype, "findAll", null);
exports.FindAllController = FindAllController = __decorate([
    (0, common_1.Controller)('find-all'),
    __metadata("design:paramtypes", [find_all_service_1.FindAllService])
], FindAllController);
//# sourceMappingURL=find-all.controller.js.map