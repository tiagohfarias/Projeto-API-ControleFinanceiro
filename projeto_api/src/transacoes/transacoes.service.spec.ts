import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { TransacoesService } from './transacoes.service';

describe('TransacoesService', () => {
  let service: TransacoesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransacoesService,
        {
          provide: getModelToken('Transacao'),
          useValue: {}, // Mock básico do modelo Mongoose
        },
      ],
    }).compile();

    service = module.get<TransacoesService>(TransacoesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
