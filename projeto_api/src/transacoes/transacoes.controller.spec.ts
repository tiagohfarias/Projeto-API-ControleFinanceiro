import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { TransacoesController } from './transacoes.controller';
import { TransacoesService } from './transacoes.service';

describe('TransacoesController', () => {
  let controller: TransacoesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransacoesController],
      providers: [
        TransacoesService,
        {
          provide: getModelToken('Transacao'),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<TransacoesController>(TransacoesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
