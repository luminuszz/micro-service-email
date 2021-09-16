import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mailer from 'nodemailer';
import * as aws from 'aws-sdk';
import { writeFile } from 'fs/promises';

import { EmailProvider } from '../core/email.provider';
import { SendEmailDTO } from '../dto/send-email.dto';

@Injectable()
export class AwsSesMailProvider implements EmailProvider {
  private transport: mailer.Transporter;
  private readonly ses: aws.SES;

  constructor(private readonly configService: ConfigService<Env.Variables>) {
    this.ses = new aws.SES({
      apiVersion: configService.get('API_VERSION'),
      region: configService.get('AWS_REGION'),
    });

    this.transport = mailer.createTransport({
      SES: {
        ses: this.ses,
        aws,
      },
    });
  }

  async sendEmail(sendEmail: SendEmailDTO): Promise<void> {
    await this.transport.sendMail({
      ...sendEmail,
      from: `Person <${this.configService.get('AUTH_EMAIL')}>`,
    });
  }
}
