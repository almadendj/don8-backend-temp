import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDriveDto } from './dto/create-drive.dto';
import { UpdateDriveDto } from './dto/update-drive.dto';

@Injectable()
export class DonationDrivesService {
  constructor(private prisma: PrismaService) {}

  private async ensureOwner(organizationId: string, userId: string) {
    const organization = await this.prisma.organization.findUnique({
      where: { id: organizationId },
    });

    if (!organization) throw new NotFoundException('organization not found');

    if (organization.ownerId !== userId) {
      throw new ForbiddenException('Not organization owner');
    }

    return organization;
  }

  async create(organizationId: string, dto: CreateDriveDto, userId: string) {
    await this.ensureOwner(organizationId, userId);

    return this.prisma.donationDrive.create({
      data: {
        organizationId,
        title: dto.title,
        description: dto.description,
        targetAmount: Number(dto.targetAmount),
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
      },
    });
  }

  async findAllForOrganization(organizationId: string) {
    return this.prisma.donationDrive.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const drive = await this.prisma.donationDrive.findUnique({
      where: { id },
    });

    if (!drive) throw new NotFoundException('Drive not found');
    return drive;
  }

  async update(id: string, dto: UpdateDriveDto, userId: string) {
    const drive = await this.prisma.donationDrive.findUnique({
      where: { id },
    });

    if (!drive) throw new NotFoundException('Drive nto found');

    await this.ensureOwner(drive.organizationId, userId);

    return this.prisma.donationDrive.update({
      where: { id },
      data: {
        ...dto,
        targetAmount: Number(dto.targetAmount),
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
      },
    });
  }

  async remove(id: string, userId: string) {
    const drive = await this.prisma.donationDrive.findUnique({
      where: { id },
    });

    if (!drive) throw new NotFoundException('Drive not found');

    await this.ensureOwner(drive.organizationId, userId);

    return this.prisma.donationDrive.delete({ where: { id } });
  }
}
