import { SendEmailDTO } from '../dto/send-email.dto';

export abstract class EmailProvider {
  abstract sendEmail(sendEmail: SendEmailDTO): Promise<void> | void;
}
