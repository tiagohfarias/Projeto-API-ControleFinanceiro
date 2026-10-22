import { Module } from '@nestjs/common';
import { SimulacaoService } from './simulacao.service';
import { SimulacaoController } from './simulacao.controller';

@Module({
  controllers: [SimulacaoController],
  providers: [SimulacaoService],
})
export class SimulacaoModule {}
