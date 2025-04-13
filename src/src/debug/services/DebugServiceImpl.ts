import { Inject, Injectable } from '@nestjs/common';
import { EncryptionService } from 'src/common/encryption/services/EncryptionService'; 
import { createDecipheriv } from 'crypto';
import { DebugService } from './DebugService';
import { ENCRYPTION_SERVICE } from 'src/common/encryption/ioc/EncryptionSymbols';

@Injectable()
export class DebugServiceImpl implements DebugService {
  constructor(
    @Inject(ENCRYPTION_SERVICE)
    private readonly encryptionService: EncryptionService,
  ) {}

  async brokenDecrypt(encryptedText: string, userSecret: string): Promise<string> {
    try {
      const [ivString, encryptedData] = encryptedText.split(':');
      const iv = Buffer.from(ivString, 'base64');
      const key = Buffer.from(userSecret).slice(0, 32);
      const decipher = createDecipheriv('aes-256-cbc', key, iv);
      
      let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
      decrypted += decipher.final('utf8');
      
      return decrypted;
    } catch (error) {
      throw new Error('Decryption failed: ' + error.message);
    }
  }

  async fixedDecrypt(encryptedText: string, userSecret: string): Promise<string> {
    return this.encryptionService.decrypt(encryptedText, userSecret);
  }
}