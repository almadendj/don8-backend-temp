import { Test, TestingModule } from '@nestjs/testing';
import { DonationDrivesController } from './donation-drives.controller';

describe('DonationDrivesController', () => {
  let controller: DonationDrivesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DonationDrivesController],
    }).compile();

    controller = module.get<DonationDrivesController>(DonationDrivesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
