import { Module } from '@nestjs/common';
import { SnsService } from './sns.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [SnsService],
  exports: [SnsService]
})
export class SnsModule {}
