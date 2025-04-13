import { Controller, Post, Get, Param, Body, UseGuards, Inject } from '@nestjs/common';
import { MessagesService } from './services/MessagesService';
import { CreateMessageRequest } from './domain/CreateMessageRequest';
import { MESSAGES_SERVICE } from './ioc/MessagesSymbols';
import { AuthGuard } from 'src/common/auth/AuthGuard'; 

@Controller('messages')
@UseGuards(AuthGuard)
export class MessagesController {
  constructor(
    @Inject(MESSAGES_SERVICE)
    private readonly messagesService: MessagesService,
  ) {}

  @Post()
  async create(@Body() request: CreateMessageRequest) {
    return this.messagesService.createMessage(request);
  }

  @Get(':userId')
  async getMessages(@Param('userId') userId: string) {
    return this.messagesService.getUserMessages(userId);
  }
}