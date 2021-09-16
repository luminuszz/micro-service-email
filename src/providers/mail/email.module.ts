import { Module } from '@nestjs/common';
import { EmailService } from './core/email.service';
import { PrismaModule } from '../prisma/prisma.module';
import { EmailProviderFactory } from './implementations';

@Module({
  imports: [PrismaModule],
  providers: [EmailService, EmailProviderFactory],

  exports: [EmailService],
})
export class EmailModule {}
