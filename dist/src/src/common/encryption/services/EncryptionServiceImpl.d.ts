import { EncryptionService } from './EncryptionService';
export declare class EncryptionServiceImpl implements EncryptionService {
    private readonly algorithm;
    private readonly ivLength;
    private readonly keyLength;
    encrypt(text: string, secret: string): Promise<string>;
    decrypt(encryptedText: string, secret: string): Promise<string>;
}
