import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SimulacaoModule } from './simulacao/simulacao.module';
import { StudentModule } from './student/student.module';
import { TransacoesModule } from './transacoes/transacoes.module';

@Module({
  imports: [SimulacaoModule, StudentModule, MongooseModule.forRoot('mongodb+srv://tiagohiran41_db_user:macarrao10@webmobile.ghbk3h4.mongodb.net/'), TransacoesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}