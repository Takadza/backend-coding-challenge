import { MessagesService } from './services/MessagesService';
import { CreateMessageRequest } from './domain/CreateMessageRequest';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    create(request: CreateMessageRequest): Promise<import("./domain/Message").Message>;
    getMessages(userId: string): Promise<import("./domain/MessageResponse").MessageResponse[]>;
}
