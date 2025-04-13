"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptionServiceImpl = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const util_1 = require("util");
const scryptAsync = (0, util_1.promisify)(crypto_1.scrypt);
let EncryptionServiceImpl = class EncryptionServiceImpl {
    algorithm = 'aes-256-cbc';
    ivLength = 16;
    keyLength = 32;
    async encrypt(text, secret) {
        const iv = (0, crypto_1.randomBytes)(this.ivLength);
        const key = (await scryptAsync(secret, 'salt', this.keyLength));
        const cipher = (0, crypto_1.createCipheriv)(this.algorithm, key, iv);
        let encrypted = cipher.update(text, 'utf8', 'base64');
        encrypted += cipher.final('base64');
        return `${iv.toString('base64')}:${encrypted}`;
    }
    async decrypt(encryptedText, secret) {
        const [ivString, encryptedData] = encryptedText.split(':');
        const iv = Buffer.from(ivString, 'base64');
        const key = (await scryptAsync(secret, 'salt', this.keyLength));
        const decipher = (0, crypto_1.createDecipheriv)(this.algorithm, key, iv);
        let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
};
exports.EncryptionServiceImpl = EncryptionServiceImpl;
exports.EncryptionServiceImpl = EncryptionServiceImpl = __decorate([
    (0, common_1.Injectable)()
], EncryptionServiceImpl);
//# sourceMappingURL=EncryptionServiceImpl.js.map