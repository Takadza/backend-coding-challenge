import { Module } from '@nestjs/common';
import { DebugController } from './DebugController';
import { DebugServiceImpl } from './services/DebugServiceImpl';
import { DEBUG_SERVICE } from './ioc/DebugSymbols'; 
import { EncryptionModule } from 'src/common/encryption/EncryptionModule'; 

@Module({
    imports: [EncryptionModule],
  controllers: [DebugController],
  providers: [
    {
      provide: DEBUG_SERVICE,
      useClass: DebugServiceImpl,
    },
  ],
  exports: [DEBUG_SERVICE], 
})
export class DebugModule {}