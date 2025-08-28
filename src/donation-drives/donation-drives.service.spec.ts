import { Test, TestingModule } from '@nestjs/testing';
import { DonationDrivesService } from './donation-drives.service';

describe('DonationDrivesService', () => {
  let service: DonationDrivesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DonationDrivesService],
    }).compile();

    service = module.get<DonationDrivesService>(DonationDrivesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
