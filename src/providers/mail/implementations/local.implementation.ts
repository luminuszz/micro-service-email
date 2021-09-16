import { EmailProvider } from '../core/email.provider';
import { SendEmailDTO } from '../dto/send-email.dto';
import { Injectable } from '@nestjs/common';

import * as mailer from 'nodemailer';

@Injectable()
export class EmailProviderLocalImplementation implements EmailProvider {
  private transport: mailer.Transporter<any>;

  constructor() {
    mailer.createTestAccount((err, acc) => {
      if (err) {
        return console.log('error', err.message);
      }

      this.transport = mailer.createTransport({
        host: acc.smtp.host,
        port: acc.smtp.port,
        secure: acc.smtp.secure,
        auth: {
          user: acc.user,
          pass: acc.pass,
        },
      });
    });
  }

  async sendEmail({ to, message }: SendEmailDTO): Promise<void> {
    console.log(
      `Enviado email, prodier: ${to} message: ${message}  `,
      EmailProviderLocalImplementation.name,
    );

    const messageObject = {
      from: 'Sender Name <sender@example.com>',
      to: 'Recipient <recipient@example.com>',
      subject: 'Nodemailer is unicode friendly ✔',
      text: 'Hello to myself!',
      html: '<p><b>Hello</b> to myself!</p>',
    };

    const response = await this.transport.sendMail(messageObject);

    console.log(JSON.stringify(response));

    console.log(mailer.getTestMessageUrl(response));
  }
}
