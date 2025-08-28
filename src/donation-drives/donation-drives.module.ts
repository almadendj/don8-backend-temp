import { Module } from '@nestjs/common';
import { DonationDrivesService } from './donation-drives.service';
import { DonationDrivesController } from './donation-drives.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [DonationDrivesService],
  controllers: [DonationDrivesController],
})
export class DonationDrivesModule {}
