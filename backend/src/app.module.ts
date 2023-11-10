import { Module } from '@nestjs/common';
import { SearchMemberModule } from './search-member/search-member.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity/user/users.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'search_member',
      entities: [Users],
      synchronize: true,
    }),
    SearchMemberModule,
  ],
})
export class AppModule {}
