import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({ type: String, description: 'Returns a greeting message' })
  getHello(): string {
    return this.appService.getHello();
  }
}
