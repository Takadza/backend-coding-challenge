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
exports.DebugController = void 0;
const common_1 = require("@nestjs/common");
const DebugSymbols_1 = require("./ioc/DebugSymbols");
const DecryptRequest_1 = require("./domain/DecryptRequest");
let DebugController = class DebugController {
    debugService;
    constructor(debugService) {
        this.debugService = debugService;
    }
    async decrypt(request) {
        try {
            const brokenResult = await this.debugService.brokenDecrypt(request.encryptedText, request.userSecret);
            const fixedResult = await this.debugService.fixedDecrypt(request.encryptedText, request.userSecret);
            return {
                brokenResult,
                fixedResult,
                matches: brokenResult === fixedResult,
                explanation: brokenResult === fixedResult
                    ? "Both methods worked (unexpected!)"
                    : "Fixed method works while broken method fails as expected"
            };
        }
        catch (error) {
            const fixedResult = await this.debugService.fixedDecrypt(request.encryptedText, request.userSecret);
            return {
                error: error.message,
                fixedResult,
                explanation: "The broken decrypt failed while fixed decrypt succeeded"
            };
        }
    }
};
exports.DebugController = DebugController;
__decorate([
    (0, common_1.Post)('decrypt'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DecryptRequest_1.DecryptRequest]),
    __metadata("design:returntype", Promise)
], DebugController.prototype, "decrypt", null);
exports.DebugController = DebugController = __decorate([
    (0, common_1.Controller)('debug'),
    __param(0, (0, common_1.Inject)(DebugSymbols_1.DEBUG_SERVICE)),
    __metadata("design:paramtypes", [Object])
], DebugController);
//# sourceMappingURL=DebugController.js.map