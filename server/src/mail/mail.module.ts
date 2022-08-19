import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const getMailConfig = async (
  configService: ConfigService,
): Promise<any> => {
  const port = configService.get<string>('EMAIL_PORT');
  const host = configService.get<string>('EMAIL_HOST');
  const emailId = configService.get<string>('EMAIL_ID');
  const password = configService.get<string>('EMAIL_PASS');

  return {
    transport: {
      host: host,
      port: port,
      secure: true,
      auth: {
        user: emailId,
        pass: password,
      },
    },
    defaults: {
      from: '"nest-modules" <user@outlook.com>',
    },
    preview: false,
    template: {
      dir: __dirname + '/templates',
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  };
};

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMailConfig,
    }),
  ],
})
export class MailModule {}
