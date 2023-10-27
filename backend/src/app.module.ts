import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FindAllModule } from './find-all/find-all.module';

@Module({
  imports: [FindAllModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
