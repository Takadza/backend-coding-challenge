import { CreateMessageRequest } from '../domain/CreateMessageRequest';
import { Message } from '../domain/Message';
import { MessageResponse } from '../domain/MessageResponse';
export interface MessagesService {
    createMessage(request: CreateMessageRequest): Promise<Message>;
    getUserMessages(userId: string): Promise<MessageResponse[]>;
}
