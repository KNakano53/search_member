import { Module } from '@nestjs/common';
import { SearchMemberModule } from './search-member/search-member.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity/user/users.entity';
import { InsertMemberModule } from './insert-member/insert-member.module';
import { Sequence } from './entity/user/sequence.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // 実行時のデータベース接続設定
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'search_member',
      entities: [Users, Sequence],
      // synchronize: true,
    }),
    SearchMemberModule,
    InsertMemberModule,
  ],
})
export class AppModule {}
