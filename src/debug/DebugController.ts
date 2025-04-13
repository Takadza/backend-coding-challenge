import { Controller, Post, Body, Inject } from '@nestjs/common';
import { DebugService } from './services/DebugService';
import { DEBUG_SERVICE } from './ioc/DebugSymbols';
import { DecryptRequest } from './domain/DecryptRequest';

@Controller('debug')
export class DebugController {
  constructor(
    @Inject(DEBUG_SERVICE)
    private readonly debugService: DebugService,
  ) {}

  @Post('decrypt')
  async decrypt(@Body() request: DecryptRequest) {
    try {
      const brokenResult = await this.debugService.brokenDecrypt(
        request.encryptedText, 
        request.userSecret
      );
      
      const fixedResult = await this.debugService.fixedDecrypt(
        request.encryptedText,
        request.userSecret
      );

      return {
        brokenResult,
        fixedResult,
        matches: brokenResult === fixedResult,
        explanation: brokenResult === fixedResult 
          ? "Both methods worked (unexpected!)"
          : "Fixed method works while broken method fails as expected"
      };
    } catch (error) {
      const fixedResult = await this.debugService.fixedDecrypt(
        request.encryptedText,
        request.userSecret
      );
      
      return {
        error: error.message,
        fixedResult,
        explanation: "The broken decrypt failed while fixed decrypt succeeded"
      };
    }
  }
}