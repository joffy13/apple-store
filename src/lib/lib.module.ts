import { Global, Module } from '@nestjs/common';
import { SmtpService } from './services/smtp.service';

@Global()
@Module({
    providers: [SmtpService],
    exports: [SmtpService]
})
export class LibModule {

}
