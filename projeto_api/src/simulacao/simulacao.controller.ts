import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { SimulacaoService } from './simulacao.service';

@Controller('simulacao')
export class SimulacaoController {
  constructor(private readonly simulacaoService: SimulacaoService) {}

  @Post('renda-fixa')
  @HttpCode(200)
  calcular(@Body() dadosRequisicao: any) {
    return this.simulacaoService.calcularRendaFixa(dadosRequisicao);
  }
}