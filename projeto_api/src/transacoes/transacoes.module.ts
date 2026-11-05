import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransacoesController } from './transacoes.controller';
import { TransacoesService } from './transacoes.service';
import { TransacaoSchema } from './transacao.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Transacao', schema: TransacaoSchema }]),
  ],
  controllers: [TransacoesController],
  providers: [TransacoesService],
})
export class TransacoesModule {}

