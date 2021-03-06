import { Service } from 'typedi';
import { MailerOptions, MailerInterface } from './interfaces';

@Service()
export default class MockedMailer implements MailerInterface {
  send(options: MailerOptions): Promise<any> {
    return Promise.resolve(true)
  }
}
