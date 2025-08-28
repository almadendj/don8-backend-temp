import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';

@Injectable()
export class OrganizationsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateOrganizationDto, ownerId: string) {
    return this.prisma.organization.create({
      data: {
        name: dto.name,
        description: dto.description,
        walletAddress: dto.wallet,
        ownerId,
        status: 'PENDING',
      },
    });
  }

  async findAll() {
    return this.prisma.organization.findMany({
      where: { status: 'APPROVED' },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const org = await this.prisma.organization.findUnique({ where: { id } });

    if (!org || org.status !== 'APPROVED') {
      throw new NotFoundException('Organization not approved or not found');
    }

    return org;
  }

  async listPending() {
    return this.prisma.organization.findMany({ where: { status: 'PENDING' } });
  }

  async approve(id: string) {
    return this.prisma.organization.update({
      where: { id },
      data: { status: 'APPROVED' },
    });
  }

  async reject(id: string) {
    return this.prisma.organization.update({
      where: { id },
      data: { status: 'REJECTED' },
    });
  }
}
