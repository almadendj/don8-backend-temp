import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  UseGuards,
  Post,
  Get,
  Patch,
} from '@nestjs/common';
import { DonationDrivesService } from './donation-drives.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateDriveDto } from './dto/create-drive.dto';
import { User } from 'src/auth/decorators/user.decorator';
import { UpdateDriveDto } from './dto/update-drive.dto';

@Controller('donation-drives')
export class DonationDrivesController {
  constructor(private readonly drives: DonationDrivesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('organizations/:organizationId/drives')
  create(
    @Param('organizationId', ParseUUIDPipe) organizationId: string,
    @Body() dto: CreateDriveDto,
    @User('userId') ownerId: string,
  ) {
    return this.drives.create(organizationId, dto, ownerId);
  }

  @Get('organizations/:organizationId/drives')
  findAllForNgo(
    @Param('organizationId', ParseUUIDPipe) organizationId: string,
  ) {
    return this.drives.findAllForOrganization(organizationId);
  }

  @Get('drives/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.drives.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('drives/:id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateDriveDto,
    @User('userId') userId: string,
  ) {
    return this.drives.remove(id, userId);
  }
}
