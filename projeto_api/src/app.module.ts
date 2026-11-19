import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TransacoesModule } from './transacoes/transacoes.module';
import { SimulacaoModule } from './simulacao/simulacao.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://tiagohiran41_db_user:Jem5p9Au96hLk5cA@webmobile.ghbk3h4.mongodb.net/financeiro?retryWrites=true&w=majority',
    ),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src', 'public'),
    }),
    TransacoesModule,
    SimulacaoModule,
  ],
})
export class AppModule {}