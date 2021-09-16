import { Provider } from '@nestjs/common';
import { EmailProvider } from '../core/email.provider';
import { ConfigService } from '@nestjs/config';
import { EmailProviderLocalImplementation } from './local.implementation';
import { AwsSesMailProvider } from './aws-ses.implementation';

export const EmailProviderFactory: Provider = {
  provide: EmailProvider,
  useFactory: (config: ConfigService<Env.Variables>) => {
    return config.get('NODE_ENV') === 'development'
      ? new EmailProviderLocalImplementation()
      : new AwsSesMailProvider(config);
  },
  inject: [ConfigService],
};
