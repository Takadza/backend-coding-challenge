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
exports.DebugServiceImpl = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const EncryptionSymbols_1 = require("../../common/encryption/ioc/EncryptionSymbols");
let DebugServiceImpl = class DebugServiceImpl {
    encryptionService;
    constructor(encryptionService) {
        this.encryptionService = encryptionService;
    }
    async brokenDecrypt(encryptedText, userSecret) {
        try {
            const [ivString, encryptedData] = encryptedText.split(':');
            const iv = Buffer.from(ivString, 'base64');
            const key = Buffer.from(userSecret).slice(0, 32);
            const decipher = (0, crypto_1.createDecipheriv)('aes-256-cbc', key, iv);
            let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
            decrypted += decipher.final('utf8');
            return decrypted;
        }
        catch (error) {
            throw new Error('Decryption failed: ' + error.message);
        }
    }
    async fixedDecrypt(encryptedText, userSecret) {
        return this.encryptionService.decrypt(encryptedText, userSecret);
    }
};
exports.DebugServiceImpl = DebugServiceImpl;
exports.DebugServiceImpl = DebugServiceImpl = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(EncryptionSymbols_1.ENCRYPTION_SERVICE)),
    __metadata("design:paramtypes", [Object])
], DebugServiceImpl);
//# sourceMappingURL=DebugServiceImpl.js.map