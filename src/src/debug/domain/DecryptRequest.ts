import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class DecryptRequest {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z0-9+/=]+:[A-Za-z0-9+/=]+$/, {
    message: 'encryptedText must be in format "base64Iv:base64Data"'
  })
  encryptedText: string;

  @IsString()
  @IsNotEmpty()
  userSecret: string;
}