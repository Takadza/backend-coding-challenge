import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesModule } from 'src/messages/MessagesModule'; 
import { DebugModule } from 'src/debug/DebugModule';
import { Message } from 'src/messages/domain/Message'; 
import { EncryptionModule } from 'src/common/encryption/EncryptionModule';

@Module({
  imports: [
    // Configuration setup
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // SQLite Database Configuration
    TypeOrmModule.forRoot({
        type: 'sqlite',
        database: 'db.sqlite', 
        entities: [Message],
        synchronize: true,
        logging: true, 
      }),
    EncryptionModule,
    MessagesModule,
    DebugModule,
    
  ],
})
export class AppModule {}