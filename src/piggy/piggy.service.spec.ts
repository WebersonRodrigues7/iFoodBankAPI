import { Test, TestingModule } from '@nestjs/testing';
import { PiggyService } from './piggy.service';

describe('PiggyService', () => {
  let service: PiggyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PiggyService],
    }).compile();

    service = module.get<PiggyService>(PiggyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
