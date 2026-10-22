import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller('simulacao')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('renda-fixa')
  simuladorRendaFixa(
    @Query('valor') valor: string,
    @Query('taxa') taxa: string,
    @Query('meses') meses: string,
  ) {
    return this.appService.calcularRendaFixa(
      Number(valor),
      Number(taxa),
      Number(meses)
    );
  }
}
