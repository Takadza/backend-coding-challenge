import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesController } from './MessagesController';
import { MessagesServiceImpl } from './services/MessagesServiceImpl';
import { MESSAGES_SERVICE } from './ioc/MessagesSymbols';
import { Message } from './domain/Message';
import { EncryptionServiceImpl } from '../common/encryption/services/EncryptionServiceImpl';
import { EncryptionService } from '../common/encryption/services/EncryptionService';
import { ENCRYPTION_SERVICE } from 'src/common/encryption/ioc/EncryptionSymbols';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  controllers: [MessagesController],
  providers: [
    {
      provide: MESSAGES_SERVICE,
      useClass: MessagesServiceImpl,
    },
    {
      provide: ENCRYPTION_SERVICE,
      useClass: EncryptionServiceImpl,
    },
  ],
})
export class MessagesModule {}