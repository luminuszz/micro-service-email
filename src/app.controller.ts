import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { SendEmailDTO } from './providers/mail/dto/send-email.dto';
import { EmailService } from './providers/mail/core/email.service';

@Controller()
export class AppController {
  constructor(private readonly emailService: EmailService) {}

  @MessagePattern('send-email')
  async sendEmailMessage(@Payload() { message, to, text, from }: SendEmailDTO) {
    return await this.emailService.sendEmailToUser({ message, to, text, from });
  }
}
