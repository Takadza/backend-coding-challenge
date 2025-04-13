import { Module } from '@nestjs/common';
import { EncryptionServiceImpl } from './services/EncryptionServiceImpl'; 
import { EncryptionService } from './services/EncryptionService'; 
import { ENCRYPTION_SERVICE } from './ioc/EncryptionSymbols'; 

@Module({
  providers: [
    {
      provide: ENCRYPTION_SERVICE,
      useClass: EncryptionServiceImpl,
    },
  ],
  exports: [ENCRYPTION_SERVICE], 
})
export class EncryptionModule {}