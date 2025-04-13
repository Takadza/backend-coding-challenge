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
exports.MessagesServiceImpl = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Message_1 = require("../domain/Message");
const EncryptionSymbols_1 = require("../../../common/encryption/ioc/EncryptionSymbols");
let MessagesServiceImpl = class MessagesServiceImpl {
    messageRepository;
    encryptionService;
    constructor(messageRepository, encryptionService) {
        this.messageRepository = messageRepository;
        this.encryptionService = encryptionService;
    }
    async createMessage(request) {
        const encrypted = await this.encryptionService.encrypt(request.content, request.userId);
        const message = this.messageRepository.create({
            userId: request.userId,
            encryptedContent: encrypted,
        });
        return this.messageRepository.save(message);
    }
    async getUserMessages(userId) {
        const messages = await this.messageRepository.find({ where: { userId } });
        return Promise.all(messages.map(async (msg) => ({
            id: msg.id,
            content: await this.encryptionService.decrypt(msg.encryptedContent, userId),
            createdAt: msg.createdAt,
        })));
    }
};
exports.MessagesServiceImpl = MessagesServiceImpl;
exports.MessagesServiceImpl = MessagesServiceImpl = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Message_1.Message)),
    __param(1, (0, common_1.Inject)(EncryptionSymbols_1.ENCRYPTION_SERVICE)),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object])
], MessagesServiceImpl);
//# sourceMappingURL=MessagesServiceImpl.js.map