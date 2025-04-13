import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../domain/Message';
import { CreateMessageRequest } from '../domain/CreateMessageRequest';
import { MessageResponse } from '../domain/MessageResponse'; 
import { MESSAGES_SERVICE } from '../ioc/MessagesSymbols'; 
import { EncryptionService } from 'src/common/encryption/services/EncryptionService';
import { MessagesService } from './MessagesService';
import { ENCRYPTION_SERVICE } from 'src/common/encryption/ioc/EncryptionSymbols';

@Injectable()
export class MessagesServiceImpl implements MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @Inject(ENCRYPTION_SERVICE)
    private readonly encryptionService: EncryptionService,
  ) {}

  async createMessage(request: CreateMessageRequest): Promise<Message> {
    const encrypted = await this.encryptionService.encrypt(
      request.content,
      request.userId,
    );

    const message = this.messageRepository.create({
      userId: request.userId,
      encryptedContent: encrypted,
    });

    return this.messageRepository.save(message);
  }

  async getUserMessages(userId: string): Promise<MessageResponse[]> {
    const messages = await this.messageRepository.find({ where: { userId } });
    return Promise.all(
      messages.map(async (msg) => ({
        id: msg.id,
        content: await this.encryptionService.decrypt(msg.encryptedContent, userId),
        createdAt: msg.createdAt,
      })),
    );
  }
}