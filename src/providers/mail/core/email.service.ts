import { BadRequestException, Injectable } from '@nestjs/common';
import { EmailProvider } from './email.provider';
import { BaseRepository } from '../../prisma/prisma.service';
import { SendEmailDTO } from '../dto/send-email.dto';
import { Email } from '@prisma/client';

@Injectable()
export class EmailService {
  constructor(
    private readonly emailProvider: EmailProvider,
    private readonly baseRepository: BaseRepository,
  ) {}

  private async createEmail(sendEmail: SendEmailDTO, isSend: boolean) {
    return this.baseRepository.email.create({
      data: {
        ...sendEmail,
        isSend,
        subject: 'algo',
        author: {
          connect: {
            email: sendEmail.from,
          },
        },
      },
    });
  }

  async sendEmailToUser(sendEmail: SendEmailDTO): Promise<Email> {
    try {
      const { to, text, from, message } = sendEmail;

      const verifyUser = await this.baseRepository.user.findUnique({
        where: {
          email: from,
        },
      });

      if (!verifyUser) {
        throw new BadRequestException('user not found');
      }

      const response = await this.emailProvider.sendEmail({
        to,
        message,
        text,
        from,
      });

      console.log('email', JSON.stringify(response));

      return this.createEmail(sendEmail, true);
    } catch (e) {
      console.log('error', e.message);

      if (e instanceof BadRequestException) {
        throw e;
      }

      return this.createEmail(sendEmail, false);
    }
  }
}
