import { EncryptionService } from 'src/common/encryption/services/EncryptionService';
import { DebugService } from './DebugService';
export declare class DebugServiceImpl implements DebugService {
    private readonly encryptionService;
    constructor(encryptionService: EncryptionService);
    brokenDecrypt(encryptedText: string, userSecret: string): Promise<string>;
    fixedDecrypt(encryptedText: string, userSecret: string): Promise<string>;
}
