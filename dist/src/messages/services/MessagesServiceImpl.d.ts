import { Repository } from 'typeorm';
import { Message } from '../domain/Message';
import { CreateMessageRequest } from '../domain/CreateMessageRequest';
import { MessageResponse } from '../domain/MessageResponse';
import { EncryptionService } from 'src/common/encryption/services/EncryptionService';
import { MessagesService } from './MessagesService';
export declare class MessagesServiceImpl implements MessagesService {
    private readonly messageRepository;
    private readonly encryptionService;
    constructor(messageRepository: Repository<Message>, encryptionService: EncryptionService);
    createMessage(request: CreateMessageRequest): Promise<Message>;
    getUserMessages(userId: string): Promise<MessageResponse[]>;
}
