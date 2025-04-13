import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { EncryptionService } from './EncryptionService';

const scryptAsync = promisify(scrypt);

@Injectable()
export class EncryptionServiceImpl implements EncryptionService {
  private readonly algorithm = 'aes-256-cbc';
  private readonly ivLength = 16;
  private readonly keyLength = 32;

  async encrypt(text: string, secret: string): Promise<string> {
    const iv = randomBytes(this.ivLength);
    const key = (await scryptAsync(secret, 'salt', this.keyLength)) as Buffer;
    const cipher = createCipheriv(this.algorithm, key, iv);
    
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    
    return `${iv.toString('base64')}:${encrypted}`;
  }

  async decrypt(encryptedText: string, secret: string): Promise<string> {
    const [ivString, encryptedData] = encryptedText.split(':');
    const iv = Buffer.from(ivString, 'base64');
    const key = (await scryptAsync(secret, 'salt', this.keyLength)) as Buffer;
    const decipher = createDecipheriv(this.algorithm, key, iv);
    
    let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }
}