"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const MessagesController_1 = require("./MessagesController");
const MessagesServiceImpl_1 = require("./services/MessagesServiceImpl");
const MessagesSymbols_1 = require("./ioc/MessagesSymbols");
const Message_1 = require("./domain/Message");
const EncryptionServiceImpl_1 = require("../common/encryption/services/EncryptionServiceImpl");
const EncryptionSymbols_1 = require("../common/encryption/ioc/EncryptionSymbols");
let MessagesModule = class MessagesModule {
};
exports.MessagesModule = MessagesModule;
exports.MessagesModule = MessagesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([Message_1.Message])],
        controllers: [MessagesController_1.MessagesController],
        providers: [
            {
                provide: MessagesSymbols_1.MESSAGES_SERVICE,
                useClass: MessagesServiceImpl_1.MessagesServiceImpl,
            },
            {
                provide: EncryptionSymbols_1.ENCRYPTION_SERVICE,
                useClass: EncryptionServiceImpl_1.EncryptionServiceImpl,
            },
        ],
    })
], MessagesModule);
//# sourceMappingURL=MessagesModule.js.map