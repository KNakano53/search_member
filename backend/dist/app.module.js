"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const search_member_module_1 = require("./search-member/search-member.module");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("./entity/user/users.entity");
const insert_member_module_1 = require("./insert-member/insert-member.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'password',
                database: 'search_member',
                entities: [users_entity_1.Users],
                synchronize: true,
            }),
            search_member_module_1.SearchMemberModule,
            insert_member_module_1.InsertMemberModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map