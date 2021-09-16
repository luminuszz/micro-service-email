import { Module } from '@nestjs/common';
import { BaseRepository } from './prisma.service';

@Module({
  providers: [BaseRepository],
  exports: [BaseRepository],
})
export class PrismaModule {}
