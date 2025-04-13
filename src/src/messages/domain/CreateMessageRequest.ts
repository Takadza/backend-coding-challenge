import { IsString, IsNotEmpty, IsUUID, MaxLength } from 'class-validator';

export class CreateMessageRequest {
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  content: string;

  @IsUUID()
  userId: string;
}