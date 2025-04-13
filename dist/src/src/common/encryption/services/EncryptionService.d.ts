export interface EncryptionService {
    encrypt(text: string, secret: string): Promise<string>;
    decrypt(encryptedText: string, secret: string): Promise<string>;
}
