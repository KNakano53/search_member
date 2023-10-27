import { Module } from '@nestjs/common';
import { FindAllService } from './find-all.service';
import { FindAllController } from './find-all.controller';

@Module({
  providers: [FindAllService],
  controllers: [FindAllController],
})
export class FindAllModule {}
