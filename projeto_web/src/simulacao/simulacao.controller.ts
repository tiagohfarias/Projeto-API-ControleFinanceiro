import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { SimulacaoService } from './simulacao.service.js';

@Controller('simulacao')
export class SimulacaoController {
  constructor(private readonly simulacaoService: SimulacaoService) {}

  @Post('renda-fixa')
  @HttpCode(200) // Para forçar o retorno "200 OK" pedido no PDF em requisições POST
  calcular(@Body() dadosRequisicao: any) {
    return this.simulacaoService.calcularRendaFixa(dadosRequisicao);
  }
}