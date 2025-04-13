export interface DebugService {
    brokenDecrypt(encryptedText: string, userSecret: string): Promise<string>;
    fixedDecrypt(encryptedText: string, userSecret: string): Promise<string>;
}
