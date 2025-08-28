import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/auth/decorators/user.decorator';

interface JwtUser {
  userId: string;
  email: string;
}

@Controller('organizations')
export class OrganizationsController {
  constructor(private orgs: OrganizationsService) {}

  @Get()
  findAll() {
    return this.orgs.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orgs.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateOrganizationDto, @User('userId') ownerId: string) {
    return this.orgs.create(dto, ownerId);
  }
}
