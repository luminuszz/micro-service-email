import { Test } from '@nestjs/testing';
import { EmailService } from './email.service';
import { EmailProvider } from './email.provider';
import { BadRequestException } from '@nestjs/common';
import { BaseRepository } from '../../prisma/prisma.service';

const MockEmailProvider = {
  sendEmail: jest.fn(),
};

const MockPrismaService = {
  email: {
    create: jest.fn(),
  },
  user: {
    findUnique: jest.fn(),
  },
};

describe('EmailService', () => {
  let emailService: EmailService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: EmailProvider,
          useValue: MockEmailProvider,
        },
        {
          provide: BaseRepository,
          useValue: MockPrismaService,
        },
      ],
    }).compile();

    emailService = moduleRef.get<EmailService>(EmailService);
  });

  it('it should be able to send a new Email', async () => {
    MockPrismaService.email.create.mockReturnValue({});
    MockPrismaService.user.findUnique.mockReturnValue({});
    MockEmailProvider.sendEmail.mockReturnValue(() =>
      console.log('email enviado'),
    );

    await emailService.sendEmailToUser({
      to: 'Carlos@gmail.com',
      from: 'Davi@gmail.com',
      text: 'Oi galera',
      message: 'Mesanmgem',
    });

    expect(MockEmailProvider.sendEmail).toBeCalledTimes(1);
  });

  it('it not should be able to send email with user not found', async () => {
    MockEmailProvider.sendEmail.mockReturnValue(() =>
      console.log('email enviado'),
    );

    MockPrismaService.user.findUnique.mockReturnValue(undefined);

    await expect(
      emailService.sendEmailToUser({
        to: 'Carlos@gmail.com',
        from: 'Davi@gmail.com',
        text: 'Oi galera',
        message: 'Mesanmgem',
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
