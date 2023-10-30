import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchMemberModule } from './search-member/search-member.module';

@Module({
  imports: [SearchMemberModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
