import { Module } from '@nestjs/common';
import { SimulacaoModule } from './simulacao/simulacao.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [SimulacaoModule, StudentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}