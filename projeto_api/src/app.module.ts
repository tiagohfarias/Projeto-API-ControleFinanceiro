import { Module } from '@nestjs/common';
import { SimulacaoModule } from './simulacao/simulacao.module';

@Module({
  imports: [SimulacaoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}