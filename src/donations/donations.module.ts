import { Module } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { DonationsController } from './donations.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ContractModule } from 'src/contract/contract.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, ContractModule, AuthModule],
  providers: [DonationsService],
  controllers: [DonationsController],
})
export class DonationsModule {}
