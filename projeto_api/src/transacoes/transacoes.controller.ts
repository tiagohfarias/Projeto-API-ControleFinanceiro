import { Body, Controller, Get, Post } from '@nestjs/common';
import { TransacoesService } from './transacoes.service';
import type { Transacao } from './transacao.model';

@Controller('transacoes')
export class TransacoesController {
  constructor(private readonly transacoesService: TransacoesService) {}

  @Post()
  async criar(@Body() transacao: Transacao) {
    const id = await this.transacoesService.criarTransacao(transacao);
    return { id };
  }

  @Get()
  async buscarTodas() {
    return await this.transacoesService.buscarComMetricas();
  }
}