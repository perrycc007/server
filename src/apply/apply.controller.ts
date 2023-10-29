import { Controller, Post, Body } from '@nestjs/common';
import { ApplyService } from './apply.service';

@Controller('apply')
export class ApplyController {
  constructor(private readonly applyService: ApplyService) {}

  @Post()
  async createApply(@Body() requestBody) {
    return this.applyService.createApply(requestBody);
  }
}
