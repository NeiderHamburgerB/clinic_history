import { TemplatesService } from './templates.service'
import { Module } from '@nestjs/common';

@Module({
    providers: [TemplatesService],
    exports: [TemplatesService]
})
export class TemplatesModule {}
