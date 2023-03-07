import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {

    private readonly transporter: nodemailer.Transporter;

    constructor(private config:ConfigService) {
      this.transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: this.config.get<string>('EMAIL_SEND'),
          pass: this.config.get<string>('PASS_SEND'),
        },
      });
    }
  
    async sendEmail(to: string[], subject: string, html: string): Promise<void> {
      await this.transporter.sendMail({
        from: this.config.get('EMAIL_SEND'),
        to,
        subject,
        html,
      });
    }
  
}
