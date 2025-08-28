import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
  ) {}

  @Get('health')
  health() {
    return { status: 'ok' };
  }

  @Get('db-check')
  async dbCheck() {
    const usersCount = await this.prisma.user.count();
    return { usersCount };
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
