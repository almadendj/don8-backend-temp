import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ContractService } from '../contract/contract.service';
import { CreateDonationDto } from './dto/create-donation.dto';

@Injectable()
export class DonationsService {
  constructor(
    private prisma: PrismaService,
    private contract: ContractService,
  ) {}

  async create(dto: CreateDonationDto, userId?: string) {
    // 1) lookup drive & its NGO
    const drive = await this.prisma.donationDrive.findUnique({
      where: { id: dto.driveId },
      include: { organization: true },
    });
    if (!drive) throw new NotFoundException('Drive not found');

    // 2) trigger on-chain donation
    const txHash = await this.contract.donate(
      drive.organization.walletAddress,
      dto.amount,
    );

    // 3) record off-chain
    return this.prisma.donation.create({
      data: {
        driveId: dto.driveId,
        userId: userId || null,
        amount: dto.amount,
        txHash,
        anonymous: dto.anonymous,
        nickname: dto.nickname,
      },
    });
  }

  async historyForUser(userId: string) {
    return this.prisma.donation.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { drive: true },
    });
  }

  async listForDrive(driveId: string) {
    return this.prisma.donation.findMany({
      where: { driveId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
