import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/decorators/user.decorator';

@Controller('donations')
export class DonationsController {
  constructor(private svc: DonationsService) {}

  // public or JWT
  @Post()
  @UseGuards(AuthGuard('jwt'))
  donate(@Body() dto: CreateDonationDto, @User('userId') reqId: string) {
    const userId = dto.anonymous ? undefined : reqId;
    return this.svc.create(dto, userId);
  }

  // user history
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  history(@User('userId') userId: string) {
    return this.svc.historyForUser(userId);
  }

  // drive owner or admin can view all
  @Get('drive/:driveId')
  listForDrive(@Param('driveId') driveId: string) {
    return this.svc.listForDrive(driveId);
  }
}
