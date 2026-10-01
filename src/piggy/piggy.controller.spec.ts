import { Test, TestingModule } from '@nestjs/testing';
import { PiggyController } from './piggy.controller';
import { PiggyService } from './piggy.service';

describe('PiggyController', () => {
  let controller: PiggyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PiggyController],
      providers: [PiggyService],
    }).compile();

    controller = module.get<PiggyController>(PiggyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
